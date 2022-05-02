//Running this script with line 9 console logs, and rl.close ok,
// so getInput seems to work to take input
// but if you comment out line 10, and uncomment line 12, we get error
// raises ypeError: Cannot read properties of undefined (reading 'then')

const Frame = require('./Frame')

let frame = new Frame();

frame.getInput();

// frame.playRoll('firstRoll', frame.knockAndLog);
