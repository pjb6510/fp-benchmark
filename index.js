import chalk from "chalk"
import range from "lodash.range";
import sum from "lodash.sum";
import { nonNullable } from "sonamu";
import Lazy from 'lazy.js'

console.clear();

async function bootstrap() {
  const N = 100000000;
  console.log(chalk.bold(`N: ${N}`));

  console.time("init numbers");
  const numbers = range(0, N).map(() => Math.floor(Math.random() * 10));
  const xs = Lazy(numbers)
  const square = (x) => x * x;
  const isEven = (x) => x % 2 === 0;
  const add = (acc, x) => acc + x;
  console.timeEnd("init numbers");;

  console.log("");

  await (async () => {
    console.time(chalk.blue("for"));

    let sumOfSquares = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] % 2 === 0) {
        sumOfSquares += numbers[i] * numbers[i];

      }
    }

    console.log(sumOfSquares);
    console.timeEnd(chalk.blue("for"));
  })();

  console.log("");

  await (async () => {
    console.time(chalk.red("lazy.js"));
    const sumOfSquares = xs
      .map(square)
      .filter(isEven)
      .reduce(add, 0);

    console.log(sumOfSquares);
    console.timeEnd(chalk.red("lazy.js"));
  })();

  console.log("");

  await (async () => {
    console.time(chalk.magentaBright("fp-like"));
    const sumOfSquares = numbers
      .map(square)
      .filter(isEven)
      .reduce(add, 0);

    console.log(sumOfSquares);
    console.timeEnd(chalk.magentaBright("fp-like"));
  })();

  console.log("");

  await (async () => {
    console.time(chalk.green("ts"));

    const sumOfSquares = sum(
      numbers
        .map((n) => {
          if (n % 2 !== 0) {
            return null;
          }
          return n * n;
        })
        .filter(nonNullable)
    )

    console.log(sumOfSquares);
    console.timeEnd(chalk.green("ts"));
  })();

  console.log("");
}

bootstrap().finally(async () => { });
