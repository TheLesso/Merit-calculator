import { readFile } from 'fs/promises';
import * as cheerio from 'cheerio';
import promptSync from 'prompt-sync';

let gradeSum = 0;
let pointSum = 0;
const output = [];
const match = {
    "A": 20, "B": 17.5, "C": 15, "D": 12.5, "E": 10, "F": 0
}
const prompt = promptSync()

async function getData() {
    const data = await readFile('./Studieplan.html', { encoding: 'utf8' });
    const $ = cheerio.load(data);
    $('[scope=row] > td').each(function (i, y) {
        if ($(y).text() != "") {
            if ($(y).text().trim() != "") {
                output.push($(y).text().trim().replaceAll(" ", ""))
            }
        }
    });
    test()
}

function test() {
    for (let i = 0; i < output.length; i++) {
        if (output[i].charAt(output[i].length - 1) == "p" && !isNaN(output[i].charAt(0))) {
            if (isNaN(output[i + 1].substring(0, 1))) {
                gradeSum += match[output[i + 1].substring(0, 1)] * Number(output[i].substring(0, output[i].length - 1));
                pointSum += Number(output[i].substring(0, output[i].length - 1));
            } else {
                if (output[i - 2].toLowerCase().includes("gymnasie")) {
                    continue
                }
                const grade = prompt("Whats your grade in " + output[i - 2] + ": ");
                if (match[grade] != undefined) {
                    gradeSum += match[grade] * Number(output[i].substring(0, output[i].length - 1))
                    pointSum += Number(output[i].substring(0, output[i].length - 1));
                }
            }
        }
    }
    let meritvalue = (gradeSum / pointSum).toFixed(2)
    console.log("Your meritvalue is: " + meritvalue + " (without any extra points)");
}

getData();

