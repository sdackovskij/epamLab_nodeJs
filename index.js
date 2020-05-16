/* eslint-disable no-console */
const fs = require('fs');
const meow = require('meow');
const minimist = require('minimist');
const csv = require('csvtojson');


const printHelp = meow(
  `
    Main options:
        -h, --help        print help info
        -r, --rvstring    run string reverse program (without option will reverse all string)
        -c, --csvtojson   run csv to json program (without options will convert all files in directory)

    String reverse options:
        -l, --length       set max length of string

    CSV to JSON convert options (all two options are required together):
        -n, --name         set file name in output directory (without extension)
        -f, --file         select file in input directory (with extension)
`, {
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
    },
  },
);

const args = minimist(process.argv.slice(2), {
  alias: {
    l: 'length',
    h: 'help',
    n: 'name',
    f: 'file',
    r: 'rvstring',
    c: 'csvtojson',
  },
  '--': true,
  unknown: () => {
    printHelp.showHelp();
    return true;
  },
});


if (args.rvstring) {
  const result = args['--'].reduce((sum, current) => `${sum} ${current}`, '')
    .split('')
    .reverse()
    .join('');

  if (result.length < args.length) {
    console.log(result);
  } else {
    console.log(
      `Max length limit: ${args.length}. Current length: ${result.length}`,
    );
  }
}

const streamWorker = (inputFile, outputName) => {
  const fileStream = fs.createReadStream(`./input/${inputFile}`);
  const result = fs.createWriteStream(`./output/${outputName}.json`);
  fileStream.pipe(csv()).pipe(result);
};

if (args.csvtojson) {
  const inputFile = args.file;
  const outputName = args.name;

  if (inputFile && outputName) {
    streamWorker(inputFile, outputName);
  } else if (inputFile || outputName) {
    printHelp.showHelp();
  } else {
    fs.readdir('./input', (err, items) => {
      items.forEach((item) => {
        if (item.search('\\.csv') !== -1) {
          streamWorker(item, item.replace(/.csv/gi, ''));
        }
      });
    });
  }
}
