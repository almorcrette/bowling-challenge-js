const Frame = require('./Frame');

let frame = new Frame();

describe('frame.userInput', () => {
  test('receives user input of number of pins knocked down', () => {
  });
});

describe('frame.roll', () => {
  test('reduces number of pins standing by number knocked down', () => {
    frame.roll(6);
    expect(frame.standingPins).toEqual(4);
  });
  test('throws if attempt number of pins knocked down greater than number standing', () => {
    function rollError() {
      frame.roll(6);
      frame.roll(6);
    }
    expect(() => {
      rollError();
    }).toThrowError();
  });
});

describe('frame.updateLog', () => {
  test('adds a first roll to frame log', () => {
    frame.updateLog('firstRoll', 5)
    expect(frame.log['firstRoll']).toEqual(5);
  });
});