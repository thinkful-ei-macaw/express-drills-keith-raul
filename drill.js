const express = require('express');

const app = express();

app.get('/sum', (req, res) => {
    const {a, b} = req.query;

    const inputA = parseFloat(a);
    const inputB = parseFloat(b);
    const c = inputA + inputB;
    const finalResponse = `The sum of ${inputA} and ${inputB} is ${c}.`;

    res
    .status(200)
    .send(finalResponse);

});

app.get('/cipher', (req, res) => {
    const {text, shift} = req.query;

    const inputShift = parseFloat(shift);

    const ceaserResponse = `Look, we did this thing already.  "${text}" has it's letters all moved by ${shift}.  Don't make me really do it.`;

    if (Number.isNaN(inputShift)){
        return res
        .status(400)
        .send('fuck off with that NaN shit');
    }

    res
    .status(200)
    .send(ceaserResponse)

});

app.get('/lotto', (req, res) => {
    const {numbers} = req.query;

    if(!numbers) {
        return res
        .status(400)
        .send('use a real number, dumpass');
    }

    const inputNumbers = numbers;
    
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
    const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }
  let diff = winningNumbers.filter(n => !inputNumbers.includes(n));

  let responseText;
  switch(diff.length){
  case 0: 
  responseText = 'Wow! Unbelievable! You could have won the mega millions!';
  break;
case 1:   
  responseText = 'Congratulations! You win $100!';
  break;
case 2:
  responseText = 'Congratulations, you win a free ticket!';
  break;
default:
  responseText = 'Sorry, you lose';  
}


    res
    .status(200)
    .send(responseText);

});


app.listen(9090, () => {
    console.log('hello world');
});