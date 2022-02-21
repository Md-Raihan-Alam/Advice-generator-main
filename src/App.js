import React,{useEffect,useState} from 'react';
import './App.css';
import Dice from "./images/icon-dice.svg"
import divider from './images/pattern-divider-desktop.svg';
import mobileDivider from "./images/pattern-divider-mobile.svg"
const url="	https://api.adviceslip.com/advice";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [advice, setAdvices] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAdvices(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);
  const fetchData=()=>{
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAdvices(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  let text="";
  let id="";
  for(let x of Object.keys(advice)){
      id+=`${advice[x].id}`;
      text+=`${advice[x].advice}`;
  }
  if (error) {
    return ( 
    <div className="App">
      <div className="header">Error</div>
      <div className="message">
        <div className='text'>
          Error:{error.message}
        </div>
      </div>
      <div className="divider">
        <img src={divider} alt="divider"/>
      </div>
      <div className="footer">
        <div className='box'>
        <img src={Dice} className="dice" alt="Dice"/>
      </div>
      </div>
    </div>
    );
  } else if (!isLoaded) {
    return (
    <div className="App">
      <div className="header">Loading</div>
      <div className="message">
        <div className='text'>
          Loading....
        </div>
      </div>
      <div className="divider">
        <img src={divider} alt="divider"/>
      </div>
      <div className="footer">
        <div className='box'>
        <img src={Dice} className="dice" alt="Dice"/>
      </div>
      </div>
    </div>
    );
  } else {
    return (
    <div className="App">
      <div className="header">Advice #{id}</div>
      <div className="message">
        <div className='text'>
          <span>{text}</span>
        </div>
      </div>
      <div className="divider">
        <img src={divider} alt="divider" className='desktopDivider'/>
        <img src={mobileDivider} alt="divider" className='mobileDivider'/>
      </div>
      <div className="footer">
        <div className='box'>
        <img src={Dice} className="dice" onClick={fetchData} alt="Dice"/>
      </div>
      </div>
    </div>
  );
  }
}
export default App;
