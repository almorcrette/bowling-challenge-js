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
    this.input = null
  }

  // userInput() {
  //   var rl = readline.createInterface( process.stdin, process.stdout );
  //   rl.setPrompt(`Roll.. how many pins did you knock down? `)
  //   rl.prompt()
  //   let p1 = Promise.resolve(
  //       rl.on('line', (roll) => {
  //         console.log(roll);
  //         rl.close()
  //       })
  //   )
  //   p1.then( (response) => { this.input = response } );
  // };

  userInput() {
    var rl = readline.createInterface( process.stdin, process.stdout );
    rl.question('Roll.. how many pins did you knock down? ', (roll) => {
      this.input = roll;
      console.log(`You knocked over ${roll} pins!`);
      console.log(this.input);
      rl.close();
    });
  };

  //consider setting up a promise for userInput

  let mypromise = function userInput() {
    return new Promise( (resolve, reject) => {
      setTimeout(
        () =>
        {
          if (resolvedFlage==true) {
            resolve("Resolved");
          } else {
            reject("Rejected")
          }
        }, 5000
      );
    });
  };


  firstPlay() {
    this.userInput()
    .then( (result) => {
      this.updateLog('firstRoll', this.input)
      console.log(this)
    });
  }

  secondPlay(userInput) {
    let roll = this.roll(userInput);
    this.updateLog('secondRoll', roll);
    return this
  }

  roll(userInput) {
    if ( userInput > this.standingPins ) {
      throw new Error('User input exceeds standing pins')
    } else {
      this.standingPins -= userInput;
    };
    return userInput;
  };

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