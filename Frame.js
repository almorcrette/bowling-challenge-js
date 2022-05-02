var readline = require('readline');

class Frame {

  constructor(frameNum=1) {
    this.frameNum = frameNum;
    this.standingPins = 10;
    this.log = {
      firstRoll: null,
      secondRoll: null,
      bonus: null,
      score: null
    };
    this.lastUserInput = null
  }

  // getInput intended to ask request and receive
  // user input of number of pins knocked over in a roll
  // using readline
  // and return that response as an integer;
  // currently updating frame.lastUserInput variable with the parsed input and returning this
  // This is the source of the problem when calling playRoll wrapping function below
  // raises ypeError: Cannot read properties of undefined (reading 'then')
  // Doesn't seem to return anything (undefined)
  // I have tried putting code on line 34 outside rl.on but then this.lastUserInput doesn't seem to update
  // In that case raises TypeError: Cannot read properties of null (reading 'then')
  // So I think the issue is with how getInput returns a value that can .then be used...
  getInput() {
    let rl = readline.createInterface( process.stdin, process.stdout );
    rl.setPrompt(`Roll.. how many pins did you knock down? `);
    rl.prompt();
    rl.on('line', (response) => {
      this.lastUserInput = parseInt(response);
      console.log(`last user input was ${this.lastUserInput}`);
      rl.close();
      console.log(`last user input still is ${this.lastUserInput}`);
      return this.lastUserInput;
    });
  };

  // knockAndLog is a callback function that will
  // do some things with the user input
  // i.e. raise and error if the input is too big
  // updated the standing pins
  // update the log (i.e. frame scoreboard)
  knockAndLog(rollNumber, userInput) {
    console.log(userInput);
    if ( userInput > this.standingPins ) {
      throw new Error('User input exceeds standing pins')
    } else {
      this.standingPins -= userInput;
    };
    this.updateLog(rollNumber, userInput);
  }

  // playRoll is the wrapping function
  // that calls getInput to get the user input
  // then calls the callbackfunction to do somethings with that input
  // and finally return the frame itself, updated.
  // This is the function that doesn't work
  // raises ypeError: Cannot read properties of undefined (reading 'then')
  // because thisgetInput() returns undefined
  playRoll(rollNumber, callbackFunction) {
    this.getInput().then( ((response) => {
      callbackFunction(rollNumber, response);
      return this;
    }))
  }

  updateLog(key, result) {
    this.log[`${key}`] = result;
    this.#privateLogScoreAndBonuses(key,result)
  };

  #privateLogScoreAndBonuses(key, result) {
    if (key === 'firstRoll' && result === 10) {
      this.log['bonus'] = 'strike';
    } else if (key === 'secondRoll') {
      if (result + this.log['firstRoll'] === 10) {
        this.log['bonus'] = 'spare'
      } else {
        this.log['score'] = this.log['firstRoll'] + this.log['secondRoll']
      }
    };
  }
};

module.exports = Frame;