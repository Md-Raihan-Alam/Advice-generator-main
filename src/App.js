import React,{useEffect,useState} from 'react';
import './App.css';
import Dice from "./images/icon-dice.svg"
import divider from './images/pattern-divider-desktop.svg';
import mobileDivider from "./images/pattern-divider-mobile.svg"
import facebook from "./images/square-facebook.svg"
import twitter from "./images/square-twitter.svg"
const url="	https://api.adviceslip.com/advice";
function App() {
  const [errorShow,setErrorShow]=useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [advice, setAdvices] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData=()=>{
    setIsLoaded(false);
    fetch(url)
      .then((res) =>{
      if(!res.ok)
      {
        throw new Error('Network response was not ok');
      }
      return res.json();
      })
      .then(
        (result) => {
          setErrorShow(false);
          setIsLoaded(true);
          setAdvices(result);
        }
      ).catch((error) => {
        console.log(error);
        setErrorShow(true);
        setIsLoaded(false);
        setError(error);
      });
  }
  let text="";
  let id="";
  for(let x of Object.keys(advice)){
      id+=`${advice[x].id}`;
      text+=`${advice[x].advice}`;
  }
  function shareOnFacebook() {
    var shareUrl = "https://www.facebook.com/dialog/share?app_id=100074538132167&display=popup&quote=" + encodeURIComponent(text);
    window.open(shareUrl, "_blank");
  }
  function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${text}&hashtags=advice`);
  }
    return (
    <div className="App" id="quote-box">
      <div className="header" id="author">
      {errorShow && !isLoaded && <span>Error</span>}
      {!errorShow && isLoaded && <span>Advice #{id}</span>}
      {!errorShow && !isLoaded && <span>Loading</span>}
        </div>
      <div className="message">
        <div className='text' id="text">
          {!errorShow && isLoaded && <span>{text}</span>}
          {!errorShow && !isLoaded && <span>Loading...</span>}
          {errorShow && !isLoaded && <span>Error:{error.message}</span>}
        </div>
      </div>
      <div className="divider">
        <img src={divider} alt="divider" className='desktopDivider'/>
        <img src={mobileDivider} alt="divider" className='mobileDivider'/>
      </div>
      <div className="socialMedia">
        <a href className="fb"><img src={facebook} width="50" onClick={shareOnFacebook} height="50" alt="facebook"/></a>
        <a href id="tweet-quote" className="fb"><img src={twitter} width="50" onClick={shareOnTwitter} height="50" alt="twitter"/></a>
      </div>
      <div className="footer">
        <div className='box' onClick={fetchData} id="new-quote">
        <img src={Dice} className="dice" alt="Dice"/>
      </div>
      </div>
    </div>
  );
}
export default App;
