# A=B Language Interpreter Usage

## Core Interpreter Files
- `interpreter.js` - Main A=B language interpreter
- `parser.js` - A=B language parser  
- `engine.js` - Execution engine
- `judge.js` - Testing and verification system
- `test.js` - Basic interpreter tests
- `package.json` - Node.js package configuration

## Usage

### Basic Interpreter
```bash
# Run A=B program
node interpreter.js program.ab "input_string"

# Run inline program  
node interpreter.js -e "a=b" "input_string"

# Show execution trace
node interpreter.js --trace program.ab "input_string"
```

### Judge System
```bash
# Run all problems
node judge.js ../Problems

# Run single problem
node judge.js ../Problems/sort

# Systematic testing with ground truth
node judge.js --systematic ../Problems/sort/solution.ab ../ground_truths/sort_ground_truth.js

# Systematic testing options
node judge.js --systematic program.ab ground_truth.js --max-length 5 --verbose
```

## File Organization
- `../Problems/` - Problem definitions with solutions and test cases
- `../examples/` - Example A=B programs and demonstrations  
- `../ground_truths/` - JavaScript ground truth functions for systematic testing
- `../interpreter_README.md` - Detailed interpreter documentation

## Systematic Testing
The judge can verify A=B programs against JavaScript ground truth functions by testing all possible inputs (strings of a,b,c) up to a specified length:

- Max length 3: 40 test cases
- Max length 4: 121 test cases  
- Max length 5: 364 test cases
- Max length 6: 1,093 test cases