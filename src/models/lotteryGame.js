import inquirer from 'inquirer';

import LotteryTicket from './lotteryTicket.js';
import {
  TICKET_PRICE,
  TOTAL_PRICE,
  MINIMUM_PLAYER,
} from '../utils/constants.js';
import logger from '../utils/logger.js';

/**
 * Lottery Game class
 */
export default class LotteryGame {
  /**
   * Initialize a new instance of LotteryGame.
   */
  constructor() {
    this.ticketPrice = TICKET_PRICE; // // Price of the ticket in euros
    this.totalPrize = TOTAL_PRICE; // Initial jackpot in euros
    this.numberOfBallsAvailable = TOTAL_PRICE / TICKET_PRICE; // Number of balls available ~ 50
    this.tickets = [];
    this.winningTickets = [];
    this.participantCount = 0;
  }

  /**
   * Purchase a ticket for the lottery game.
   */
  async purchaseTicket() {
    try {
      const remainingBalls =
        this.numberOfBallsAvailable - this.participantCount;
      logger.info(
        `****** Number of players who can still take part in the lottery is ${remainingBalls} ******`
      );
      if (this.numberOfBallsAvailable > this.participantCount) {
        const questions = [
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter your first name:',
            validate: (answer) => {
              if (answer === '') {
                return 'Please enter a valid name';
              }
              return true;
            },
          },
        ];

        const answer = await inquirer.prompt(questions);
        if (answer === undefined || answer.firstName === '') {
          logger.error('Please provid valid input');
          return;
        }
        const ticketNumber = this.tickets.length + 1;
        const ticket = new LotteryTicket(answer.firstName, ticketNumber);
        this.tickets.push(ticket);
        logger.info(
          `Ticket purchased successfully! Your ticket number is ${ticketNumber}`
        );
        this.participantCount += 1;
      } else {
        logger.warn(
          'The maximum number of participants has been reached. No further purchases are possible'
        );
      }
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * Draw winners from purchased tickets
   */
  drawWinners() {
    const totalTickets = this.tickets.length;
    if (totalTickets < MINIMUM_PLAYER) {
      logger.error(
        `Not enough participants to draw winners, there are missing ${
          MINIMUM_PLAYER - totalTickets
        } participants`
      );
      return;
    } else {
      const winningTickets = this.winningTickets;
      // The drawing has not been conducted yet
      if (winningTickets.length === 0) {
        while (winningTickets.length < MINIMUM_PLAYER) {
          const randomIndex = Math.floor(Math.random() * totalTickets);
          const randomTicket = this.tickets[randomIndex];
          if (!winningTickets.includes(randomTicket)) {
            winningTickets.push(randomTicket);
          }
        }
        logger.info('Draw was successful');
      } else {
        logger.warn('The drawing has already been conducted');
      }
    }
  }

  /**
   * Output the lottery results.
   */
  outputResult() {
    if (this.winningTickets.length === 0) {
      logger.warn(
        'The drawing must be conducted before displaying the results'
      );
    } else {
      const winningTickets = this.winningTickets;
      const firstPrize = Math.round((this.totalPrize * 0.75) / 2);
      const secondPrize = Math.round((this.totalPrize * 0.15) / 2);
      const thirdPrize = Math.round((this.totalPrize * 0.1) / 2);

      // console.log is only used to display the output expected in exercise
      console.log('CodeCraft Challenge Results');

      winningTickets.forEach((ticket, index) => {
        console.log(`${index + 1}st ball: ${ticket.number}`);
      });
      console.log('Lottery Winners:');
      winningTickets.forEach((ticket, index) => {
        let prize =
          index === 0
            ? firstPrize
            : index === 1
            ? secondPrize
            : index === 2
            ? thirdPrize
            : 0;
        console.log(`${ticket.firstName}: ${prize} Euros`);
      });
    }
  }
}
