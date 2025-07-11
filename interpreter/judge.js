import { AEqualsBInterpreter } from './interpreter.js';
import fs from 'fs';
import path from 'path';

export class ABJudge {
  constructor() {
    this.interpreter = new AEqualsBInterpreter();
  }

  // Generate all possible strings of a,b,c with length 1 to maxLength
  generateAllInputs(maxLength = 6) {
    const inputs = [];
    const chars = ['a', 'b', 'c'];
    
    // Generate strings of each length
    for (let len = 1; len <= maxLength; len++) {
      const generateStringsOfLength = (currentString, remaining) => {
        if (remaining === 0) {
          inputs.push(currentString);
          return;
        }
        
        for (const char of chars) {
          generateStringsOfLength(currentString + char, remaining - 1);
        }
      };
      
      generateStringsOfLength('', len);
    }
    
    // Add empty string
    inputs.unshift('');
    
    return inputs;
  }

  // Systematic verification against ground truth
  runSystematicTest(programFile, groundTruthFunction, options = {}) {
    const {
      maxLength = 6,
      timeoutMs = 1000,
      stopOnFirstFailure = false,
      verbose = false
    } = options;

    console.log(`Running systematic test for ${path.basename(programFile)}...`);
    console.log(`Generating inputs with max length ${maxLength}...`);
    
    const inputs = this.generateAllInputs(maxLength);
    console.log(`Testing ${inputs.length} inputs total`);
    console.log('='.repeat(60));

    let passed = 0;
    let failed = 0;
    let errors = 0;
    const failures = [];

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      
      try {
        // Get ground truth
        const expected = groundTruthFunction(input);
        
        // Run A=B program
        const actual = this.interpreter.runFile(programFile, input, timeoutMs);
        
        if (actual === expected) {
          passed++;
          if (verbose) {
            console.log(`✓ "${input}" -> "${actual}"`);
          }
        } else {
          failed++;
          const failure = { input, expected, actual, error: null };
          failures.push(failure);
          
          if (verbose || stopOnFirstFailure) {
            console.log(`✗ "${input}"`);
            console.log(`  Expected: "${expected}"`);
            console.log(`  Actual:   "${actual}"`);
          }
          
          if (stopOnFirstFailure) {
            break;
          }
        }
      } catch (error) {
        errors++;
        const failure = { input, expected: 'N/A', actual: null, error: error.message };
        failures.push(failure);
        
        if (verbose || stopOnFirstFailure) {
          console.log(`✗ "${input}" - Error: ${error.message}`);
        }
        
        if (stopOnFirstFailure) {
          break;
        }
      }

      // Progress indicator for large test sets
      if (!verbose && (i + 1) % 100 === 0) {
        process.stdout.write(`\rProgress: ${i + 1}/${inputs.length}`);
      }
    }

    if (!verbose && inputs.length > 100) {
      process.stdout.write('\n');
    }

    console.log('='.repeat(60));
    console.log(`Results: ${passed}/${inputs.length} tests passed`);
    console.log(`Failed: ${failed}, Errors: ${errors}`);
    
    // Show first few failures
    if (failures.length > 0) {
      console.log('\nFirst few failures:');
      failures.slice(0, 5).forEach((failure, idx) => {
        console.log(`${idx + 1}. Input: "${failure.input}"`);
        if (failure.error) {
          console.log(`   Error: ${failure.error}`);
        } else {
          console.log(`   Expected: "${failure.expected}"`);
          console.log(`   Actual:   "${failure.actual}"`);
        }
      });
      
      if (failures.length > 5) {
        console.log(`   ... and ${failures.length - 5} more failures`);
      }
    }

    return {
      programFile,
      total: inputs.length,
      passed,
      failed,
      errors,
      failures,
      success: failed === 0 && errors === 0
    };
  }

  runTestCase(programFile, input, expectedOutput, testName = '') {
    try {
      const result = this.interpreter.runFile(programFile, input);
      const passed = result === expectedOutput;
      
      return {
        passed,
        testName,
        input,
        expected: expectedOutput,
        actual: result,
        error: null
      };
    } catch (error) {
      return {
        passed: false,
        testName,
        input,
        expected: expectedOutput,
        actual: null,
        error: error.message
      };
    }
  }

  runTestSuite(problemDir) {
    const testCasesFile = path.join(problemDir, 'test_cases.json');
    const programFile = path.join(problemDir, 'solution.ab');
    
    if (!fs.existsSync(testCasesFile)) {
      throw new Error(`Test cases file not found: ${testCasesFile}`);
    }
    
    if (!fs.existsSync(programFile)) {
      throw new Error(`Program file not found: ${programFile}`);
    }

    const testCases = JSON.parse(fs.readFileSync(testCasesFile, 'utf8'));
    const results = [];

    console.log(`Running test suite for ${path.basename(problemDir)}...`);
    console.log('='.repeat(50));

    let passed = 0;
    let total = testCases.length;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const result = this.runTestCase(
        programFile, 
        testCase.input, 
        testCase.expected, 
        testCase.name || `Test ${i + 1}`
      );
      
      results.push(result);
      
      if (result.passed) {
        console.log(`✓ ${result.testName}`);
        passed++;
      } else {
        console.log(`✗ ${result.testName}`);
        console.log(`  Input: "${result.input}"`);
        console.log(`  Expected: "${result.expected}"`);
        if (result.error) {
          console.log(`  Error: ${result.error}`);
        } else {
          console.log(`  Actual: "${result.actual}"`);
        }
      }
    }

    console.log('='.repeat(50));
    console.log(`Results: ${passed}/${total} tests passed`);
    
    return {
      problemName: path.basename(problemDir),
      passed,
      total,
      results,
      success: passed === total
    };
  }

  runAllProblems(problemsBaseDir) {
    const problems = fs.readdirSync(problemsBaseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const allResults = [];
    let totalPassed = 0;
    let totalTests = 0;

    console.log('A=B Language Judge System');
    console.log('========================');
    console.log('');

    for (const problem of problems) {
      const problemDir = path.join(problemsBaseDir, problem);
      try {
        const result = this.runTestSuite(problemDir);
        allResults.push(result);
        totalPassed += result.passed;
        totalTests += result.total;
        console.log('');
      } catch (error) {
        console.log(`✗ ${problem}: ${error.message}`);
        console.log('');
      }
    }

    console.log('Overall Results');
    console.log('===============');
    console.log(`Total: ${totalPassed}/${totalTests} tests passed`);
    
    for (const result of allResults) {
      const status = result.success ? '✓' : '✗';
      console.log(`${status} ${result.problemName}: ${result.passed}/${result.total}`);
    }

    return allResults;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const judge = new ABJudge();

  if (args.length === 0) {
    console.log('A=B Language Judge System');
    console.log('Usage:');
    console.log('  node judge.js <problems_dir>              # Run all problems');
    console.log('  node judge.js <problem_dir>               # Run single problem');
    console.log('  node judge.js --systematic <program.ab> <ground_truth.js>');
    console.log('                                            # Systematic testing');
    console.log('  node judge.js --systematic <problem_dir>  # Auto systematic testing');
    console.log('');
    console.log('Systematic testing options:');
    console.log('  --max-length N    # Test strings up to length N (default: 6)');
    console.log('  --verbose         # Show all test results');
    console.log('  --stop-on-fail    # Stop on first failure');
    process.exit(1);
  }

  if (args[0] === '--systematic') {
    if (args.length < 2) {
      console.error('Systematic testing requires either:');
      console.error('  --systematic <program.ab> <ground_truth.js>');
      console.error('  --systematic <problem_dir>');
      process.exit(1);
    }

    // Check if second argument is a directory (problem folder) or file
    const secondArg = args[1];
    const isDirectory = fs.existsSync(secondArg) && fs.lstatSync(secondArg).isDirectory();
    
    let programFile, groundTruthFile;
    let optionStartIndex;
    
    if (isDirectory) {
      // Auto-detect files in problem directory
      programFile = path.join(secondArg, 'solution.ab');
      groundTruthFile = path.join(secondArg, 'ground_truth.js');
      optionStartIndex = 2;
      
      if (!fs.existsSync(programFile)) {
        console.error(`Solution file not found: ${programFile}`);
        process.exit(1);
      }
      
      if (!fs.existsSync(groundTruthFile)) {
        console.error(`Ground truth file not found: ${groundTruthFile}`);
        process.exit(1);
      }
    } else {
      // Original format with explicit files
      if (args.length < 3) {
        console.error('Systematic testing with explicit files requires both program and ground truth files');
        process.exit(1);
      }
      
      programFile = args[1];
      groundTruthFile = args[2];
      optionStartIndex = 3;
      
      if (!fs.existsSync(programFile)) {
        console.error(`Program file not found: ${programFile}`);
        process.exit(1);
      }
      
      if (!fs.existsSync(groundTruthFile)) {
        console.error(`Ground truth file not found: ${groundTruthFile}`);
        process.exit(1);
      }
    }

    // Parse options
    const options = {};
    for (let i = optionStartIndex; i < args.length; i++) {
      if (args[i] === '--max-length' && i + 1 < args.length) {
        options.maxLength = parseInt(args[i + 1]);
        i++;
      } else if (args[i] === '--verbose') {
        options.verbose = true;
      } else if (args[i] === '--stop-on-fail') {
        options.stopOnFirstFailure = true;
      }
    }

    // Import and run ground truth function
    import(path.resolve(groundTruthFile))
      .then(module => {
        const groundTruthFunction = module.default || module.groundTruth;
        if (typeof groundTruthFunction !== 'function') {
          throw new Error('Ground truth file must export a default function or groundTruth function');
        }
        judge.runSystematicTest(programFile, groundTruthFunction, options);
      })
      .catch(error => {
        console.error('Error loading ground truth:', error.message);
        process.exit(1);
      });
  } else {
    const targetPath = args[0];
    
    if (fs.existsSync(path.join(targetPath, 'test_cases.json'))) {
      // Single problem
      judge.runTestSuite(targetPath);
    } else {
      // Multiple problems
      judge.runAllProblems(targetPath);
    }
  }
}