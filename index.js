import { readFile } from 'fs/promises';
import * as cheerio from 'cheerio';
import { copyFileSync } from 'fs';

let sum
const output = [];
const match = {
    "A":20, "B":17.5, "C":15, "D":12.5, "E":10, "F":0
}

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
    /*
    for (let i = 0; i < output.length; i++) {
        console.log(output[i])
    }
    */
    test()
}

function test() {
    for (let i = 0; i < output.length; i++) {
        if (output[i].substring(3, 4) == "p" || output[i].substring(2, 3) == "p") {
            if (isNaN(Number(output[i+1]))) {
                sum = match[output[i+1].substring(0,1)] * Number(output[i].substring(0,output[i].length-1));
            }
        }
    }
    console.log(sum)
}

getData();
