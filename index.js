
const meow = require('meow');
const minimist = require('minimist');



const args = minimist(process.argv.slice(2), {
  alias: { l: 'length', h: 'help', n: 'name' },
});
meow(
  `Usage:
        $0 FILES [options]
    Options:
        -h, --help         print help info
`, {
    alias: { l: 'length', h: 'help', n: 'name' }
  /* minimist options */
}
);
if (args.length) {
  const result = args._.reduce((sum, current) => `${sum} ${current}`, '')
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

if (args.name) {
  console.log(args.name);
}

console.log(args)