import { AEqualsBInterpreter } from './interpreter.js';

const interpreter = new AEqualsBInterpreter();

function test(name, program, input, expected) {
  const result = interpreter.run(program, input);
  const passed = result === expected;
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) {
    console.log(`  Expected: "${expected}"`);
    console.log(`  Got:      "${result}"`);
  }
  return passed;
}

console.log('Running A=B interpreter tests...\n');

test('Example 1: Replace a with b', 
     'a=b', 
     'abcabc', 
     'bbcbbc');

test('Example 2: String length mod 3 (input: aaabbcccaa)', 
     `b=a
c=a
aaa=
aa=(return)2
a=(return)1
=(return)0`, 
     'aaabbcccaa', 
     '1');

test('Example 2: String length mod 3 (input: aa)', 
     `b=a
c=a
aaa=
aa=(return)2
a=(return)1
=(return)0`, 
     'aa', 
     '2');

test('Example 2: String length mod 3 (input: a)', 
     `b=a
c=a
aaa=
aa=(return)2
a=(return)1
=(return)0`, 
     'a', 
     '1');

test('Example 2: String length mod 3 (input: empty)', 
     `b=a
c=a
aaa=
aa=(return)2
a=(return)1
=(return)0`, 
     '', 
     '0');

test('Example 3: Compare occurrences (should return true)', 
     `ba=ab
cb=bc
ca=ac
abc=
abbc=b
bbc=b
bcc=(return)true
=(return)false`, 
     'abbccc', 
     'true');

test('Example 3: Compare occurrences (should return false)', 
     `ba=ab
cb=bc
ca=ac
abc=
abbc=b
bbc=b
bcc=(return)true
=(return)false`, 
     'aabbcc', 
     'false');

test('Start modifier test', 
     '(start)hello=world', 
     'helloworld', 
     'worldworld');

test('End modifier test', 
     '(end)world=hello', 
     'helloworld', 
     'hellohello');

test('Once modifier test', 
     '(once)a=b', 
     'aaa', 
     'baa');

test('Move to start test', 
     'x=(start)y', 
     'axbxc', 
     'yyabc');

test('Move to end test', 
     'x=(end)y', 
     'axbxc', 
     'abcyy');

console.log('\nTest completed!');