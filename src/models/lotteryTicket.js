/**
 * Lottery Ticket Class
 */
export default class LotteryTicket {
  /**
   * Creates a new instance of LotteryTicket.
   * @param {string} firstName - The first name of the ticket holder.
   * @param {number} number - The ticket number.
   */
  constructor(firstName, number) {
    this.firstName = firstName;
    this.number = number;
  }
}
