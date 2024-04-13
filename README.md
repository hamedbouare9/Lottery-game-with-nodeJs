# Lottery Game Project

## Overview

The Lottery Game project is a console-based application designed to simulate a simple lottery game where users can purchase tickets, winners are randomly drawn, and prizes are awarded. The project consists of several components organized into folders, each responsible for specific functionalities.

## Project Structure

The project structure is organized into folders:

- **controllers**: Contains the `LotteryController.js` file responsible for managing user interactions and controlling the flow of the lottery game.
- **models**: Contains the `LotteryGame.js` and `LotteryTicket.js` files representing the core logic and data structures of the lottery game.
- **utils**: Contains utility files including `constants.js` for storing game constants and `logger.js` for logging game events.

## How to Run

To run the lottery game:

1. Ensure Node.js is installed on your system. **I'm using the node version v20.12.0**
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Execute `npm run start` to start the game.

## Running Unit Tests

Unit tests can be executed using `npm run test`

## Dependencies

### Runtime Dependencies

- `inquirer`: For handling user prompts and input.
- `winston`: For logging game events and errors.

### Development Dependencies

- `jest`: Testing framework for writing and running unit tests.
- `eslint`: Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Contributors

- **Hamed BOUARE**: <email: <dr.hamed.bouare@gmail.com>>
