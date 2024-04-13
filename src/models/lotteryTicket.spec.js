import LotteryTicket from './lotteryTicket.js';

describe('LotteryTicket', () => {
  it('should create a new instance of LotteryTicket with the provided parameters', () => {
    const firstName = 'Hamed';
    const number = 12345;
    const ticket = new LotteryTicket(firstName, number);
    expect(ticket.firstName).toBe(firstName);
    expect(ticket.number).toBe(number);
  });

  it('should have default values if parameters are not provided', () => {
    const ticket = new LotteryTicket();
    expect(ticket.firstName).toBeUndefined();
    expect(ticket.number).toBeUndefined();
  });
});
