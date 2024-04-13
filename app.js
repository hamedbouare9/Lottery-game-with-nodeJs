import LotteryController from './src/controllers/lotteryController.js';
import LotteryGame from './src/models/lotteryGame.js';
import {
  MINIMUM_PLAYER,
  TOTAL_PRICE,
  TICKET_PRICE,
} from './src/utils/constants.js';
import logger from './src/utils/logger.js';

const lotteryGame = new LotteryGame();
const lotteryController = new LotteryController(lotteryGame);
logger.info(
  `******************* The maximum number of participants allowed for this lottery is ${
    TOTAL_PRICE / TICKET_PRICE
  } gamers. A minimum of ${MINIMUM_PLAYER} participants is necessary for a draw to occur *******************`
);
await lotteryController.start();
