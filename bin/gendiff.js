#!/usr/bin/env node
import { Command } from 'commander';
import { resolve } from 'node:path';
import { genDiff } from '../src/index.js';
import { parseData } from '../src/parsers.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const resolvedPath1 = resolve(filepath1);
    const resolvedPath2 = resolve(filepath2);

    const data1 = parseData(resolvedPath1);
    const data2 = parseData(resolvedPath2);
    console.log(genDiff(data1, data2));
  });

program.parse();
