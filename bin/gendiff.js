#!/usr/bin/env node
import { Command } from 'commander';
import { resolve } from 'node:path';
import { parseData, genDiff } from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = parseData(resolve(filepath1));
    const data2 = parseData(resolve(filepath2));
    console.log(genDiff(data1, data2));
  });

program.parse();
