#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);
    
    const data1 = fs.readFileSync(absolutePath1, 'utf-8');
    const data2 = fs.readFileSync(absolutePath2, 'utf-8');

    const parsedData1 = JSON.parse(data1);
    const parsedData2 = JSON.parse(data2);

    console.log(parsedData1);
    console.log(parsedData2);
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
