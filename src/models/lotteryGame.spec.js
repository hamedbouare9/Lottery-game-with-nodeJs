import { jest } from '@jest/globals';
import inquirer from 'inquirer';

import logger from '../utils/logger.js';
import LotteryGame from './lotteryGame.js';

describe('LotteryGame', () => {
  let game;
  beforeEach(() => {
    game = new LotteryGame();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('purchaseTicket', () => {
    it('should purchase a ticket when there are available balls', async () => {
      const mockPrompt = jest.fn().mockImplementation(() => {
        return Promise.resolve({ firstName: 'Hamed' });
      });
      const loggerinfoSpy = jest.spyOn(logger, 'info');
      inquirer.prompt = mockPrompt;
      await game.purchaseTicket();
      expect(game.tickets.length).toBe(1);
      expect(game.participantCount).toBe(1);
      expect(loggerinfoSpy).toHaveBeenCalled();
    });

    it('should not purchase a ticket when there are no available balls', async () => {
      game.numberOfBallsAvailable = 0;
      const loggerinfoSpy = jest.spyOn(logger, 'warn');
      await game.purchaseTicket();
      expect(game.tickets.length).toBe(0);
      expect(game.participantCount).toBe(0);
      expect(loggerinfoSpy).toHaveBeenCalled();
    });

    it('should not purchase a ticket if participant name is empty', async () => {
      inquirer.prompt.mockResolvedValueOnce({ firstName: '' });
      const loggerinfoSpy = jest.spyOn(logger, 'error');
      await game.purchaseTicket();
      expect(game.tickets.length).toBe(0);
      expect(game.participantCount).toBe(0);
      expect(loggerinfoSpy).toHaveBeenCalledWith('Please provid valid input');
    });

    it('should log an error if an exception occurs during ticket purchase', async () => {
      const loggerErrorSpy = jest.spyOn(logger, 'error');
      const mockThrowError = jest.fn().mockImplementationOnce(() => {
        throw new Error();
      });
      inquirer.prompt = mockThrowError;
      await game.purchaseTicket();
      expect(loggerErrorSpy).toHaveBeenCalled();
    });
  });

  describe('drawWinners', () => {
    it('should draw winners if there are enough participants', () => {
      game.tickets = [{}, {}, {}];
      const loggerInfoSpy = jest.spyOn(logger, 'info');
      game.drawWinners();
      expect(game.winningTickets.length).toBe(3);
      expect(loggerInfoSpy).toHaveBeenCalledWith('Draw was successful');
    });

    it('should not draw winners if there are not enough participants', () => {
      const loggerErrorSpy = jest.spyOn(logger, 'error');
      game.drawWinners();
      expect(game.winningTickets.length).toBe(0);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Not enough participants to draw winners, there are missing 3 participants'
      );
    });

    it('should not draw winners if already drawn', () => {
      game.tickets = [{}, {}, {}];
      game.drawWinners();
      const loggerWarnSpy = jest.spyOn(logger, 'warn');
      game.drawWinners();
      expect(loggerWarnSpy).toHaveBeenCalledWith(
        'The drawing has already been conducted'
      );
    });
  });

  describe('outputResult', () => {
    it('should log warning if winningTickets is empty', () => {
      game.outputResult();
      expect(logger.warn).toHaveBeenCalledWith(
        'The drawing must be conducted before displaying the results'
      );
    });
    it('should display lottery results when there are winning tickets', () => {
      game.winningTickets = [{ firstName: 'Hamed', number: 1 }];
      const consoleLogSpy = jest.spyOn(console, 'log');
      game.outputResult();
      expect(consoleLogSpy).toHaveBeenCalledWith('CodeCraft Challenge Results');
      expect(consoleLogSpy).toHaveBeenCalledWith('1st ball: 1');
      expect(consoleLogSpy).toHaveBeenCalledWith('Lottery Winners:');
    });
  });
});
