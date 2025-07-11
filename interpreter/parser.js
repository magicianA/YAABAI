export class Parser {
  static parseProgram(program) {
    const lines = program.split('\n');
    const instructions = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lineNumber = i + 1;
      
      if (line === '' || line.startsWith('#')) {
        continue;
      }
      
      const commentIndex = line.indexOf('#');
      const cleanLine = commentIndex >= 0 ? line.substring(0, commentIndex).trim() : line;
      
      if (cleanLine === '') {
        continue;
      }
      
      try {
        const instruction = this.parseLine(cleanLine, lineNumber);
        if (instruction) {
          instructions.push(instruction);
        }
      } catch (error) {
        throw new Error(`Line ${lineNumber}: ${error.message}`);
      }
    }
    
    return instructions;
  }
  
  static parseLine(line, lineNumber) {
    // Validate exactly one equals sign
    const equalCount = (line.match(/=/g) || []).length;
    if (equalCount === 0) {
      throw new Error("Missing '=' sign - each instruction must have exactly one '=' sign");
    }
    if (equalCount > 1) {
      throw new Error("Multiple '=' signs found - each instruction must have exactly one '=' sign");
    }
    
    const equalIndex = line.indexOf('=');
    const left = line.substring(0, equalIndex);
    const right = line.substring(equalIndex + 1);
    
    // Validate parentheses are balanced
    this.validateParentheses(left, 'left side');
    this.validateParentheses(right, 'right side');
    
    const instruction = {
      type: 'replace',
      left: left,
      right: right,
      leftModifiers: {},
      rightModifiers: {},
      once: false
    };
    
    // Parse and validate modifiers
    instruction.left = this.parseModifiers(left, instruction.leftModifiers, 'left side');
    instruction.right = this.parseModifiers(right, instruction.rightModifiers, 'right side');
    
    // Validate modifier combinations
    this.validateModifierCombinations(instruction);
    
    // Check for dangerous empty patterns
    this.validateNotInfiniteLoop(instruction);
    
    // Set instruction type based on modifiers
    if (instruction.leftModifiers.once) {
      instruction.once = true;
      instruction.type = 'once';
    }
    
    if (instruction.rightModifiers.return) {
      instruction.type = 'return';
    }
    
    if (instruction.leftModifiers.start) {
      instruction.type = 'start';
    }
    
    if (instruction.leftModifiers.end) {
      instruction.type = 'end';
    }
    
    if (instruction.rightModifiers.start) {
      instruction.type = 'move_to_start';
    }
    
    if (instruction.rightModifiers.end) {
      instruction.type = 'move_to_end';
    }
    
    return instruction;
  }
  
  static parseModifiers(str, modifiers, side) {
    let content = str;
    
    // Find all parenthetical expressions
    const parenRegex = /\(([^)]+)\)/g;
    let match;
    const keywordPositions = [];
    
    while ((match = parenRegex.exec(str)) !== null) {
      const keyword = match[1];
      const validKeywords = ['start', 'end', 'return', 'once'];
      
      if (!validKeywords.includes(keyword)) {
        throw new Error(`Invalid keyword '${keyword}' - valid keywords are: start, end, return, once`);
      }
      
      keywordPositions.push({
        keyword,
        start: match.index,
        end: match.index + match[0].length,
        full: match[0]
      });
      
      // Set modifier
      modifiers[keyword] = true;
    }
    
    // Validate keyword positions according to A=B language rules
    for (const kw of keywordPositions) {
      const atStart = kw.start === 0;
      const atEnd = kw.end === str.length;
      
      // General rule: keywords cannot be in the middle
      if (!atStart && !atEnd) {
        throw new Error(`Keyword '(${kw.keyword})' cannot be in the middle of ${side}`);
      }
      
      // Specific rules for each keyword based on side
      if (side === 'left side') {
        if (kw.keyword === 'end' && !atStart) {
          throw new Error(`(end) keyword can only be at the beginning of left side`);
        }
        if (kw.keyword === 'start' && !atStart) {
          throw new Error(`(start) keyword can only be at the beginning of left side`);
        }
        if (kw.keyword === 'once' && !atStart) {
          throw new Error(`(once) keyword can only be at the beginning of left side`);
        }
        if (kw.keyword === 'return') {
          throw new Error(`(return) keyword cannot be used on left side`);
        }
      } else if (side === 'right side') {
        if (kw.keyword === 'end' && !atStart) {
          throw new Error(`(end) keyword can only be at the beginning of right side`);
        }
        if (kw.keyword === 'start' && !atStart) {
          throw new Error(`(start) keyword can only be at the beginning of right side`);
        }
        if (kw.keyword === 'once') {
          throw new Error(`(once) keyword cannot be used on right side`);
        }
        if (kw.keyword === 'return' && !atStart) {
          throw new Error(`(return) keyword can only be at the beginning of right side`);
        }
      }
    }
    
    // Remove all keywords from content
    for (const kw of keywordPositions) {
      content = content.replace(kw.full, '');
    }
    
    return content;
  }
  
  static validateParentheses(str, side) {
    let depth = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        depth++;
      } else if (str[i] === ')') {
        depth--;
        if (depth < 0) {
          throw new Error(`Unmatched closing parenthesis ')' in ${side}`);
        }
      }
    }
    if (depth > 0) {
      throw new Error(`Unmatched opening parenthesis '(' in ${side}`);
    }
  }
  
  static validateModifierCombinations(instruction) {
    const leftMods = instruction.leftModifiers;
    const rightMods = instruction.rightModifiers;
    
    // Check conflicting left side modifiers
    if (leftMods.start && leftMods.end) {
      throw new Error("Cannot use both (start) and (end) modifiers on the same side");
    }
    
    // Check conflicting right side modifiers  
    if (rightMods.start && rightMods.end) {
      throw new Error("Cannot use both (start) and (end) modifiers on the same side");
    }
    
    if (rightMods.return && (rightMods.start || rightMods.end)) {
      throw new Error("Cannot use (return) with (start) or (end) modifiers");
    }
    
    // Check invalid modifier combinations across sides
    if (leftMods.return) {
      throw new Error("(return) modifier can only be used on the right side");
    }
    
    if (rightMods.once) {
      throw new Error("(once) modifier can only be used on the left side");
    }
  }
  
  static validateNotInfiniteLoop(instruction) {
    // Check for empty left side without position modifiers (dangerous)
    if (instruction.left === '' && !instruction.leftModifiers.start && !instruction.leftModifiers.end && !instruction.leftModifiers.once) {
      throw new Error("Empty pattern on left side without (once), (start) or (end) modifier will cause infinite loop");
    }
    
    // Warn about potentially dangerous patterns
    if (instruction.left === '' && instruction.right !== '') {
      // This is allowed with position modifiers but could still be tricky
      // The validation above already handles the dangerous case
    }
  }
}