const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const result = args._.reduce(
  (sum, current) => `${sum} ${current}`
)
  .split("")
  .reverse()
  .join("");

if (result.length < args.length) {
  console.log(result);
} else {
  console.log(`Max length limit: ${args.length}. Current length: ${result.length}`);
}

