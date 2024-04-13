import inquirer from 'inquirer';

import logger from '../utils/logger.js';

/**
 * Controller class for managing lottery game actions.
 */
export default class LotteryController {
  /**
   * Creates a new LotteryController instance
   * @param {Object} lotteryGame - An instance of the LotteryGame class
   */
  constructor(lotteryGame) {
    this.lotteryGame = lotteryGame;
  }

  /**
   * Starts the lottery game
   */
  async start() {
    try {
      const choices = ['Purchase', 'Draw', 'Winners'];
      const questions = [
        {
          type: 'list',
          name: 'action',
          message: 'Choose an action:',
          choices: choices,
        },
      ];

      const answer = await inquirer.prompt(questions);

      switch (answer.action) {
        case 'Purchase':
          await this.purchaseTicket();
          break;
        case 'Draw':
          this.drawWinners();
          break;
        case 'Winners':
          this.outputResult();
          break;
      }
      await this.start();
    } catch (err) {
      logger.error(err);
    }
  }

  /**
   * Handles purchasing a ticket in the lottery game.
   */
  async purchaseTicket() {
    await this.lotteryGame.purchaseTicket();
  }

  /**
   * Handles drawing winners in the lottery game.
   */
  drawWinners() {
    this.lotteryGame.drawWinners();
  }
  /**
   * Outputs the result of the lottery game.
   */
  outputResult() {
    this.lotteryGame.outputResult();
  }
}
