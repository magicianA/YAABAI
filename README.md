# YAABAI

Yet Another [A=B](./A_equal_B_lang.md) Interpreter.

YAABA is an [A=B programming language](./A_equal_B_lang.md) (from the [A=B game](https://store.steampowered.com/app/1720850/AB/) )interpreter designed to test LLM agents' ability to solve A=B programming problems.

## Quick Start

### Running the Interpreter

```bash
# Run a program with input
node interpreter/interpreter.js Problems/hello_world/solution.ab "abc"

# Run with execution trace
node interpreter/interpreter.js --trace Problems/hello_world/solution.ab "abc"
```

### Testing Solutions

```bash
# Test all problems
node interpreter/judge.js Problems/

# Test single problem with test cases
node interpreter/judge.js Problems/hello_world/

# Systematic testing (auto-detect files)
node interpreter/judge.js --systematic Problems/hello_world_hard/

# Systematic testing with options
node interpreter/judge.js --systematic Problems/replace_a_with_b/ --max-length 4 --verbose
```

## Project Structure

```
interpreter/          # Core A=B interpreter
├── interpreter.js    # Main interpreter with CLI
├── parser.js         # A=B syntax parser
├── engine.js         # Execution engine
└── judge.js          # Testing framework

Problems/             # Problem collection
├── hello_world/      # Basic problems
├── hello_world_hard/ # Advanced challenges
├── a+b/             # Arithmetic problems
└── ...              # More problems

A_equal_B_lang.md     # Language specification
```

## Testing Framework

The judge system supports multiple testing modes:

### Standard Test Suites
Problems with `test_cases.json` files can be tested using predefined test cases:
```bash
node interpreter/judge.js Problems/hello_world/
```

### Systematic Testing
For comprehensive verification, systematic testing generates all possible inputs up to a specified length:
```bash
# Auto-detect solution.ab and ground_truth.js
node interpreter/judge.js --systematic Problems/problem_name/

# Manual file specification
node interpreter/judge.js --systematic solution.ab ground_truth.js
```

#### Systematic Testing Options
- `--max-length N`: Test strings up to length N (default: 6)
- `--verbose`: Show all test results
- `--stop-on-fail`: Stop on first failure

### Example Output
```
Running systematic test for solution.ab...
Generating inputs with max length 4...
Testing 121 inputs total
============================================================
Results: 121/121 tests passed
Failed: 0, Errors: 0
```

## Language Features

A=B is a Turing-complete string manipulation language. See [A_equal_B_lang.md](./A_equal_B_lang.md) for complete specification.

### Basic Operations
- `a=b` - Replace first occurrence of 'a' with 'b'
- `a=(return)b` - If 'a' found, replace entire string with 'b' and terminate
- `(start)a=b` - Match 'a' only at string start
- `(end)a=b` - Match 'a' only at string end
- `(once)a=b` - Execute rule at most once

### Example Problems Included
- **hello_world**: Basic string replacement
- **hello_world_hard**: Output "helloworld" without using keywords
- **replace_a_with_b**: Character substitution
- **length_mod_3**: Calculate string length modulo 3
- **count_comparison**: Compare character frequencies
- **a+b**: Parse and add two numbers
- **sort**: Sort characters in string
- **remove_three**: Remove every third character
