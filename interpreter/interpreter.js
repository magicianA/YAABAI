import { Parser } from './parser.js';
import { ExecutionEngine } from './engine.js';
import fs from 'fs';

export class AEqualsBInterpreter {
  constructor() {
    this.engine = new ExecutionEngine();
  }
  
  run(program, input, timeoutMs = 1000, trace = false) {
    const instructions = Parser.parseProgram(program);
    return this.engine.execute(instructions, input, timeoutMs, trace);
  }
  
  runFile(programFile, input) {
    const program = fs.readFileSync(programFile, 'utf8');
    return this.run(program, input);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node interpreter.js [--trace] <program.ab> <input>');
    console.log('   or: node interpreter.js [--trace] -e "<program>" <input>');
    console.log('Options:');
    console.log('  --trace  Show execution trace');
    process.exit(1);
  }
  
  let trace = false;
  let programArg = 0;
  
  if (args[0] === '--trace') {
    trace = true;
    programArg = 1;
  }
  
  if (args.length < programArg + 2) {
    console.log('Usage: node interpreter.js [--trace] <program.ab> <input>');
    console.log('   or: node interpreter.js [--trace] -e "<program>" <input>');
    process.exit(1);
  }
  
  const interpreter = new AEqualsBInterpreter();
  
  try {
    let result;
    if (args[programArg] === '-e') {
      result = interpreter.run(args[programArg + 1], args[programArg + 2] || '', 1000, trace);
    } else {
      const program = fs.readFileSync(args[programArg], 'utf8');
      result = interpreter.run(program, args[programArg + 1], 1000, trace);
    }
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}