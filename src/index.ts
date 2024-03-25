import fs from "fs";
import parseInput from "./parser";

const input = fs.readFileSync("./input.txt").toString();

const parser = parseInput(input);

for (const token of parser) {
    console.log(token);
}
