"use strict";

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
// Read the file and print its contents.
var fs = require("fs"),
  filename = process.argv[2];

function parse_input_line(range, character, password) {
  this.range = range;
  this.character = character.split(":");
  this.password = password;

  let splitrange = range.split("-");
  this.min = splitrange[0];
  this.max = splitrange[1];

  const parameters = {
    min: this.min,
    max: this.max,
    charater: this.character,
    password: this.password,
  };
  return parameters;
}

fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;

  let file_data = data.toString().split("\n");

  // Part 1 and 2 mixed in
  let valid_count = 0;

  let new_valid_count = 0;
  for (let i = 0; i < file_data.length; i++) {
    const our_obj = {
      name: "dummy",
    };
    parse_input_line.apply(our_obj, file_data[i].split(" "));

    console.log(our_obj);
    let regex = new RegExp(our_obj.character[0], "gi");
    console.log(`regex: ${regex}`);
    let count = (our_obj.password.match(regex) || []).length;
    console.log(`Count found is ${count}`);
    if (count >= our_obj.min && count <= our_obj.max) valid_count++;

    //part 2
    if(our_obj.password[our_obj.min-1] == our_obj.character[0] && our_obj.password[our_obj.max-1] != our_obj.character[0]) {
        new_valid_count++;
    } else if (our_obj.password[our_obj.max-1] == our_obj.character[0] && our_obj.password[our_obj.min-1] != our_obj.character[0]) {
        new_valid_count++;
    }
  }

  console.log(`Valid count is ${valid_count}`);
  console.log(`New Valid Count is ${new_valid_count}`);

});
