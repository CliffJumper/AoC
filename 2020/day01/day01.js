"use strict";

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
// Read the file and print its contents.
var fs = require("fs"),
  filename = process.argv[2];

fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;

  let sorted_data = data.toString().split("\n");
  sorted_data.sort(function (a, b) {
    return a - b;
  });

  // A
  for (let i = 0; i < sorted_data.length; i++) {
      if(2020 - sorted_data[i] >= 0){
          if(sorted_data.find(element => element == (2020 - sorted_data[i])) != undefined) {
              console.log(`Found ${sorted_data[i]} and ${(2020 - sorted_data[i])}`)
              console.log(sorted_data[i] * (2020 - sorted_data[i]));
              break;
          } 
      }
  }

  // B
  for (let i = 0; i < sorted_data.length; i++) {
    let val1 = sorted_data[i];
    for(let j = i+1; j < sorted_data.length; j++) {
        let val2 = sorted_data[j];
        let val3 = 2020 - val1 - val2;
        if(val3 <= 0) {
            continue;
        }
        if(sorted_data.find(element => element == val3) != undefined) {
           console.log(`Found ${val1}, ${val2}, and ${val3}`);
           console.log(`product: ${(val1 * val2 * val3)}`);           
           return;
        }
       } 
    }
});
