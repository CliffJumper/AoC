let fs = require("fs");
const { exit } = require("process");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const read_file_lines = (filename) =>
  fs.readFileSync(filename).toString("utf8").split("\n");

let input_lines = read_file_lines(process.argv[2]);

let command_list = [];

for (i of input_lines) {
  line = i.split(" ");
  command_list.push({
    direction: line[0],
    distance: parseInt(line[1]),
  });
}

// Part 1
let h_offset = 0,
  d_offset = 0;
console.log(command_list);
for (i of command_list) {
  if (i.direction === "forward") {
    h_offset += i.distance;
  } else if (i.direction === "down") {
    d_offset += i.distance;
  } else if (i.direction === "up") {
    d_offset -= i.distance;
  }
}

console.log(`h_offset == ${h_offset}; d_offset ${d_offset}`);
console.log(`PRODUCT ${h_offset * d_offset}`);

// Part 2

console.log("############################ PART 2 ##########################");
h_offset = 0;
d_offset = 0;
let d_change = 0;
for (i of command_list) {
  if (i.direction === "forward") {
    h_offset += i.distance;
    d_offset += i.distance * d_change;
  } else if (i.direction === "down") {
    d_change += i.distance;
  } else if (i.direction === "up") {
    d_change -= i.distance;
  }
}
console.log(`h_offset == ${h_offset}; d_offset ${d_offset}`);
console.log(`PRODUCT ${h_offset * d_offset}`);
