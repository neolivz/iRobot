#!/usr/bin/env node

import chalk from "chalk";
import * as readline from "readline";
import { prompt, list, input } from "typed-prompts";
import { Bot, Direction } from "./Bot";

console.log(chalk.cyan("Hello there;"));

const bot = Bot();

const place = async () => {
  const { x } = await prompt([input("x", "Please enter x?")]);
  const { y } = await prompt([input("y", "Please enter y?")]);
  const { direction } = await prompt([
    list("direction", "Please select direction?", [
      Direction.North,
      Direction.East,
      Direction.West,
      Direction.South
    ])
  ]);
  const status = bot.place(parseInt(x), parseInt(y), direction);
  if (status === false) {
    console.log(chalk.red("Placement Failure"));
  }
};

const move = () => {
  const status = bot.move();
  if (status === false) {
    console.log(chalk.red("Movement Failure"));
  } else {
    return report();
  }
};
const left = () => {
  const status = bot.left();
  if (status === false) {
    console.log(chalk.red("Left Turn Failure, did you place the bot yet?"));
  } else {
    return report();
  }
};
const right = () => {
  const status = bot.right();
  if (status === false) {
    console.log(chalk.red("Right Turn Failure, did you place the bot yet?"));
  } else {
    return report();
  }
};
const report = () => {
  const { x, y, direction } = bot.report();
  if (x === undefined || y === undefined || direction === undefined) {
    console.log(chalk.blueBright("Not Yet Placed"));
  } else {
    console.log(`${chalk.cyan("X=")}${chalk.bold.cyanBright(x)}`);
    console.log(`${chalk.yellow("Y=")}${chalk.bold.yellowBright(y)}`);
    console.log(`${chalk.magenta("X=")}${chalk.bold.magentaBright(direction)}`);
  }
};

const ask = async () => {
  const { action } = await prompt([
    list("action", "What do you want to do?", [
      "Move",
      "Left",
      "Right",
      "Place",
      "Report",
      "Quit"
    ])
  ]);
  if (action !== "Quit") {
    switch (action) {
      case "Place":
        await place();
        break;
      case "Move":
        await move();
        break;
      case "Left":
        await left();
        break;
      case "Right":
        await right();
        break;
      case "Report":
        await report();
        break;
    }
    ask();
  }
};

ask();
