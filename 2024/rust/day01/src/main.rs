use std::collections::HashMap;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

// File Reading noise
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

// For Part 1
fn find_diff(first_list: Vec<usize>, second_list: Vec<usize>) -> usize {
    let mut n = 0;
    let mut sum = 0;
    while n < first_list.len() {
        sum += first_list[n].abs_diff(second_list[n]);
        n += 1;
    }
    sum
}

// For Part 2
fn find_similarity(first_list: Vec<usize>, second_list: Vec<usize>) -> usize {
    let mut n = 0;
    let mut similarity = 0;

    while n < first_list.len() {
        similarity += first_list[n] * (second_list.iter().filter(|&i| *i == first_list[n]).count());
        n += 1;
    }
    similarity
}

// Try Part 2 using HashMap
fn find_similarity_hash(first_list: Vec<usize>, second_list: Vec<usize>) -> usize {
    let mut similarity = 0;
    let mut second_count = HashMap::new();
    for item in second_list.iter() {
        second_count.insert(
            item,
            1 + if second_count.contains_key(item) {
                second_count[item]
            } else {
                0
            },
        );
    }

    for item in first_list.iter() {
        if second_count.contains_key(item) {
            similarity += item * second_count[item];
        }
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
            let first = split.next().unwrap().parse().unwrap();
            first_list.push(first);
            let second = split.next().unwrap().parse().unwrap();
            second_list.push(second);
        }

        first_list.sort();
        second_list.sort();

        // Part 1
        let sum = find_diff(first_list.clone(), second_list.clone());

        println!("Part 1 Sum {}", sum);

        // Part 2 -- Brute  (Iterates Vec 2 for each item in Vec 1 -- O(n^2))
        println!(
            "Part 2 Similarity {}",
            find_similarity(first_list.clone(), second_list.clone())
        );
        // Part 2 -- Use Map (Iterates each vec once -- O(2n))
        println!(
            "Part 2 Similarity Hash {}",
            find_similarity_hash(first_list, second_list)
        );
    }
}
