let fs = require("fs");
const { exit } = require("process");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const read_file_lines = filename => 
  fs.readFileSync(filename)
  .toString('utf8')
  .split('\n');

const count_increases = the_array => {
  let last_line = 0;
  let increase_count = 0;
  for (line of the_array) {
    line = parseInt(line);
    // Don't count first entry as an increase
    if (last_line === 0) {
      last_line = line;
      continue;
    }

    if (last_line < line) increase_count++;
    last_line = line;
  }
  return increase_count;
}

let file_array = read_file_lines(process.argv[2]);

//Part 1
let count = count_increases(file_array);
console.log(`Increased ${count} times`);

//Part2
let sum_array = []
last_line = 0;
for(let i=0; i<file_array.length-3; i++) {
  let segment_sum = 0;
  segment_sum += parseInt(file_array[i]) + parseInt(file_array[i+1]) + parseInt(file_array[i+2]);
  sum_array.push(segment_sum);
}
let count2 = count_increases(sum_array);

console.log(`part 2 increased ${count2} times.`);