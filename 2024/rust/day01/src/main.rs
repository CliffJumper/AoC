use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

// For Part 1
fn find_diff(first_list: Vec<u32>, second_list: Vec<u32>) -> u32 {
    let mut n = 0;
    let mut sum: u32 = 0;
    while n < first_list.len() {
        sum += first_list[n].abs_diff(second_list[n]);
        n += 1;
    }
    sum
}

// For Part 2
fn find_similarity(first_list: Vec<u32>, second_list: Vec<u32>) -> u32 {
    let mut n = 0;
    let mut similarity = 0;

    while n < first_list.len() {
        similarity +=
            first_list[n] * (second_list.iter().filter(|&i| *i == first_list[n]).count()) as u32;
        n += 1;
    }
    similarity
}

fn main() {
    let mut first_list = vec![];
    let mut second_list = vec![];
    if let Ok(lines) = read_lines("./input") {
        for line in lines.flatten() {
            //    println!("{}", line);
            let mut split = line.split_whitespace();
            let first: u32 = split.next().unwrap().parse().unwrap();
            first_list.push(first);
            let second: u32 = split.next().unwrap().parse().unwrap();
            second_list.push(second);
        }

        first_list.sort();
        second_list.sort();

        // Part 1
        let sum = find_diff(first_list.clone(), second_list.clone());

        println!("Part 1 Sum {}", sum);

        // Part 2
        println!(
            "Part 2 Similarity {}",
            find_similarity(first_list, second_list)
        );
    }
}
