import React, {useState, useEffect} from 'react';
import './App.css';
import Number from './Number';

function App() {
  const [input, setInput] = useState('');     // nicely formatted label that appears on screen
  const [eqn, setEqn] = useState('0+');       // string holding equation
  const [lastNum, setLastNum] = useState('');
  const [answer, setAnswer] = useState(NaN);

  const handleClickNumber = (num) => {
    if (num === '.' && lastNum.includes('.')) { // check last input was not '.'
      return;
    } else {
      const c = num === '.' ? '.' : num.toString();
      setInput((prev) => prev.toString() + c);
      setEqn((prev) => prev.toString() + c);
      setLastNum((prev) => prev.toString() + c);   //save last number
    }
  }

  const handleClickOperation = (op) => {
    if (!isNaN(parseInt(input.slice(-1)))) { //check if last input was a digit
      setInput((prev) => prev.toString() +  " " + op + " ")
      setLastNum('');

      switch(op) {
        case '':
          setEqn((prev) => prev.toString());
          break;
        case '+':
          setEqn((prev) => prev.toString() + '+');
          break;
        case '-':
          setEqn((prev) => prev.toString() + '-');
          break;
        case '×':
          setEqn((prev) => prev.toString() + '*');
          break;
        case '÷':
          setEqn((prev) => prev.toString() + '/');
          break;
      }
    }
  }

  const handleClear = () => {
    setInput('');
    setEqn('0+');
    setLastNum('');
    setAnswer(NaN);
  }

  useEffect( () => {
    if (!isNaN(parseInt(input.slice(-1)))) {
      setAnswer(eval(eqn))
    }
  }, [eqn]);

  const nums = [1,2,3,4,5,6,7,8,9,0,'.'];
  const numbers = nums.map((num) => <Number key={num} value={num} handleClick={handleClickNumber} />);

  const operations = ['+','-','×','÷'].map((op, i) => <Number key={i+10} value={op} handleClick={handleClickOperation} />);

  return (
    <div className="container">
      <div className="screen">
        <p>&nbsp;{input||''}</p>
        <div className="answer" >&nbsp;{(isNaN(answer)) ? '' : ' = ' + answer}</div>
      </div>
      <div><div className="numbers" >{numbers.slice(0,3)}</div><div className="operations">{operations[0]}</div></div> {/* 1 2 3 + */}
      <div><div className="numbers" >{numbers.slice(3,6)}</div><div className="operations">{operations[1]}</div></div> {/* 4 5 6 - */}
      <div><div className="numbers" >{numbers.slice(6,9)}</div><div className="operations">{operations[2]}</div></div> {/* 7 8 9 × */}
      <div className="numbers" >
        <div className="zero">{numbers.slice(9,10)}</div> {/* zero */}
        {numbers.slice(10,)}                              {/* . */}
        <div className="operations">{operations[3]}</div> {/* ÷ */}
      </div>
      <div className="clear" ><button onClick={handleClear}>CLEAR</button></div>
    </div>
  );
}

export default App;
