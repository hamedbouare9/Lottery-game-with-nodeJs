import { jest } from '@jest/globals';
import inquirer from 'inquirer';

import LotteryController from './lotteryController.js';
import logger from '../utils/logger.js';

const mockLotteryGame = {
  purchaseTicket: jest.fn(),
  drawWinners: jest.fn(),
  outputResult: jest.fn(),
};

const lotteryController = new LotteryController(mockLotteryGame);

describe('LotteryController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('start', () => {
    it('should call purchaseTicket method when action is "Purchase"', async () => {
      const mockPrompt = jest
        .fn()
        .mockResolvedValueOnce({ action: 'Purchase' });
      inquirer.prompt = mockPrompt;
      const purchaseTicketSpy = jest.spyOn(lotteryController, 'purchaseTicket');
      await lotteryController.start();
      expect(purchaseTicketSpy).toHaveBeenCalled();
    });

    it('should call drawWinners method when action is "Draw"', async () => {
      const mockPrompt = jest.fn().mockResolvedValueOnce({ action: 'Draw' });
      inquirer.prompt = mockPrompt;
      const drawWinnersSpy = jest.spyOn(lotteryController, 'drawWinners');
      await lotteryController.start();
      expect(drawWinnersSpy).toHaveBeenCalled();
    });

    it('should call outputResult method when action is "Winners"', async () => {
      const mockPrompt = jest.fn().mockResolvedValueOnce({ action: 'Winners' });
      inquirer.prompt = mockPrompt;
      const outputResultSpy = jest.spyOn(lotteryController, 'outputResult');
      await lotteryController.start();
      expect(outputResultSpy).toHaveBeenCalled();
    });

    it('should call start method recursively', async () => {
      const mockPrompt = jest
        .fn()
        .mockResolvedValueOnce({ action: 'Purchase' });
      inquirer.prompt = mockPrompt;
      const startSpy = jest.spyOn(lotteryController, 'start');
      await lotteryController.start();
      expect(startSpy).toHaveBeenCalledTimes(2);
    });

    it('should log an error if an exception occurs during start', async () => {
      const mockPrompt = jest
        .fn()
        .mockRejectedValueOnce(new Error('Test error'));
      inquirer.prompt = mockPrompt;
      const loggerErrorSpy = jest.spyOn(logger, 'error');
      await lotteryController.start();
      expect(loggerErrorSpy).toHaveBeenCalledWith(new Error('Test error'));
    });
  });

  describe('purchaseTicket', () => {
    it('should call purchaseTicket method of LotteryGame', async () => {
      await lotteryController.purchaseTicket();
      expect(mockLotteryGame.purchaseTicket).toHaveBeenCalled();
    });
  });

  describe('drawWinners', () => {
    it('should call drawWinners method of LotteryGame', () => {
      lotteryController.drawWinners();
      expect(mockLotteryGame.drawWinners).toHaveBeenCalled();
    });
  });

  describe('outputResult', () => {
    it('should call outputResult method of LotteryGame', () => {
      lotteryController.outputResult();
      expect(mockLotteryGame.outputResult).toHaveBeenCalled();
    });
  });
});
