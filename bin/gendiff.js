#!/usr/bin/env node
import { Command } from 'commander';
import { resolve } from 'node:path';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const resolvedPath1 = resolve(filepath1);
    const resolvedPath2 = resolve(filepath2);

    console.log(genDiff(resolvedPath1, resolvedPath2));
  });

program.parse();
