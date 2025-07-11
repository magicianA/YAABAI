export class ExecutionEngine {
  constructor() {
    this.executedOnceInstructions = new Set();
  }
  
  execute(instructions, input, timeoutMs = 1000, trace = false) {
    let currentString = input;
    this.executedOnceInstructions.clear();
    const startTime = Date.now();
    let iterations = 0;
    const maxIterations = 100000;
    
    if (trace) {
      console.log(`[TRACE] Initial: "${currentString}"`);
    }
    
    while (true) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(`Program execution timed out after ${timeoutMs}ms`);
      }
      
      if (iterations++ > maxIterations) {
        throw new Error(`Program exceeded maximum iterations (${maxIterations})`);
      }
      
      let executed = false;
      
      for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        
        if (instruction.once && this.executedOnceInstructions.has(i)) {
          if (trace) {
            console.log(`[TRACE] Skip line ${i + 1} (once): ${this.formatInstruction(instruction)}`);
          }
          continue;
        }
        
        const result = this.executeInstruction(instruction, currentString);
        
        if (result.executed) {
          if (trace) {
            console.log(`[TRACE] Line ${i + 1}: ${this.formatInstruction(instruction)}`);
            console.log(`[TRACE] "${currentString}" -> "${result.newString}"`);
          }
          
          currentString = result.newString;
          executed = true;
          
          if (instruction.once) {
            this.executedOnceInstructions.add(i);
          }
          
          if (result.shouldReturn) {
            if (trace) {
              console.log(`[TRACE] Return: "${currentString}"`);
            }
            return currentString;
          }
          
          break;
        } else if (trace) {
          console.log(`[TRACE] Line ${i + 1} no match: ${this.formatInstruction(instruction)}`);
        }
      }
      
      if (!executed) {
        if (trace) {
          console.log(`[TRACE] No more rules apply. Final: "${currentString}"`);
        }
        break;
      }
    }
    
    return currentString;
  }
  
  formatInstruction(instruction) {
    let left = instruction.left;
    let right = instruction.right;
    
    if (instruction.leftModifiers.start) left = `(start)${left}`;
    if (instruction.leftModifiers.end) left = `(end)${left}`;
    if (instruction.leftModifiers.once) left = `(once)${left}`;
    
    if (instruction.rightModifiers.return) right = `(return)${right}`;
    if (instruction.rightModifiers.start) right = `(start)${right}`;
    if (instruction.rightModifiers.end) right = `(end)${right}`;
    
    return `${left}=${right}`;
  }
  
  executeInstruction(instruction, str) {
    switch (instruction.type) {
      case 'replace':
        return this.executeReplace(instruction, str);
      case 'return':
        return this.executeReturn(instruction, str);
      case 'start':
        return this.executeStart(instruction, str);
      case 'end':
        return this.executeEnd(instruction, str);
      case 'move_to_start':
        return this.executeMoveToStart(instruction, str);
      case 'move_to_end':
        return this.executeMoveToEnd(instruction, str);
      case 'once':
        return this.executeReplace(instruction, str);
      default:
        return { executed: false, newString: str, shouldReturn: false };
    }
  }
  
  executeReplace(instruction, str) {
    const index = str.indexOf(instruction.left);
    if (index === -1) {
      return { executed: false, newString: str, shouldReturn: false };
    }
    
    const newString = str.substring(0, index) + 
                     instruction.right + 
                     str.substring(index + instruction.left.length);
    
    return { executed: true, newString: newString, shouldReturn: false };
  }
  
  executeReturn(instruction, str) {
    const index = str.indexOf(instruction.left);
    if (index === -1) {
      return { executed: false, newString: str, shouldReturn: false };
    }
    
    return { executed: true, newString: instruction.right, shouldReturn: true };
  }
  
  executeStart(instruction, str) {
    if (str.startsWith(instruction.left)) {
      const newString = instruction.right + str.substring(instruction.left.length);
      return { executed: true, newString: newString, shouldReturn: false };
    }
    
    return { executed: false, newString: str, shouldReturn: false };
  }
  
  executeEnd(instruction, str) {
    if (str.endsWith(instruction.left)) {
      const newString = str.substring(0, str.length - instruction.left.length) + instruction.right;
      return { executed: true, newString: newString, shouldReturn: false };
    }
    
    return { executed: false, newString: str, shouldReturn: false };
  }
  
  executeMoveToStart(instruction, str) {
    const index = str.indexOf(instruction.left);
    if (index === -1) {
      return { executed: false, newString: str, shouldReturn: false };
    }
    
    const beforeMatch = str.substring(0, index);
    const afterMatch = str.substring(index + instruction.left.length);
    const newString = instruction.right + beforeMatch + afterMatch;
    
    return { executed: true, newString: newString, shouldReturn: false };
  }
  
  executeMoveToEnd(instruction, str) {
    const index = str.indexOf(instruction.left);
    if (index === -1) {
      return { executed: false, newString: str, shouldReturn: false };
    }
    
    const beforeMatch = str.substring(0, index);
    const afterMatch = str.substring(index + instruction.left.length);
    const newString = beforeMatch + afterMatch + instruction.right;
    
    return { executed: true, newString: newString, shouldReturn: false };
  }
}