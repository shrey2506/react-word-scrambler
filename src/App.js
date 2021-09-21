
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

 

  const [data, getData] = useState('');
  const [index, getIndex] = useState(0);
  const [urlCounter,getUrlCounter]=useState(1);
  const [score,getScore]=useState(0);
  const [result, getResult]=useState(0);
  

  const url = 'https://api.hatchways.io/assessment/sentences/';
  



  function reverseWord(str) {



    var i = 1;

    
    var j = str.length - 2;

    var strchar = str.split("");

    while (i < j) {
      // Swap str[i] and str[j]
      var temp = strchar[i];
      strchar[i] = strchar[j];
      strchar[j] = temp;
      i++;
      j--;
    }
    str = strchar.join("");
    return str;
  }


  function reverseWords(str) {
    var tok = str.split(" ");
    var str1 = "";


    // While there are words left
    for (const w of tok) {
      // Print the reversed word

      str1 += reverseWord(w) + " ";

    }
    document.getElementById("scrambled-word").innerHTML = str1


  }

  const fetchData = async(urlCounter) => {

    const result=await axios(url+urlCounter);
    getData(result.data)
   
   }
  

  useEffect(() => {
    

     fetchData(urlCounter)
   
    

  },[])



 
  

  const check_input = (val) => {


    var string = Array.from(data.data.sentence);
    
  

    if (val.target.value === string[index]) {
      getScore(score+1);
      
      document.getElementById(`${index}`).style.backgroundColor='#4caf50'
      document.getElementById(`${index}`).innerHTML=val.target.value
     
      

      if (index <string.length) {
        getIndex(index + 1)
      }

    } else if (val.target.value !== string[index]) {
      document.getElementById("next").style.display="none";
      document.getElementById(`${index}`).style.backgroundColor='#a64452'
    
      if (index < string.length) {
        getIndex(index + 1)
      }
    }

    if (index >= string.length-1) {
      document.getElementById("answer_box").style.display = "none";
   
     
    }
    
     console.log(result)
     document.getElementById("score").innerHTML='Score: '+ result
    if(score===string.length-1){
      
       
        console.log(result)
       
        getUrlCounter(urlCounter+1)
        
      document.getElementById("next").style.display="flex";
      document.getElementById("next").classList.add("center");
       

    }
    

    val.target.value = ''
  }

  const startGame=()=>{
    if(data!=null){
      document.getElementById('container').style.display="block"
      document.getElementById('start_button').style.display="none"
      document.getElementById('answer_box').focus();
    }else{
      console.log("Error")
  }
       
  }


  const nextSentence=()=>{
    getResult(result+1)
    document.getElementById("answer_box").style.display = "block";
    document.getElementById('answer_box').focus();
    document.getElementById("next").style.display="none";
   
     fetchData(urlCounter)
     document.getElementById("answer_box").style.display = "block";
     getIndex(0);
     getScore(0);

     var string = Array.from(data.data.sentence);
     for(var i=0;i<string.length;i++){
      document.getElementById(`${i}`).style.backgroundColor='#FFFFFF'
      document.getElementById(`${i}`).innerHTML=''
    }
     console.log(string)

     if(urlCounter>10){
         document.getElementById("win_message").style.display="flex"
         document.getElementById("win_message").classList.add("center");
         document.getElementById("container").style.display="none";
     }
  }

 


  return (
  <> 
  <div id="start_button"  className="center card">
      <button className="start" onClick={startGame}>Start Game</button>
  </div>
    

    <div className="background">
    <div id="container" className="center card">
      <div className="heading center" id="scrambled-word">
        {data ? reverseWords(data.data.sentence) :console.log('No data found')}
      </div>

      <div className="sub_heading center">
        Guess the sentence! Start typing
      </div>

      <div className="sub_heading center">
        The yellow blocks are meant for spaces
      </div>

      <div id="score" className="sub_heading center">
        Score: 0
      </div>

      {data ? <div className="grid">
            
            {Array.from(data.data.sentence).map((val,i)=>{
                 return(
                  <div style={ val==" "? {backgroundColor: '#ffb74d'}: {}}  className="tile center" id={i}  key={i}></div>
                 )           
            })
            }
        

      </div> : <div>No data found</div>}
     

      <button style={{display: 'none', backgroundColor: '#4caf50',color: '#FFFFFF', border: 'none', fontSize: '16px', padding: '10px'}} id="next" className="next" onClick={nextSentence}>Next</button>
     
    </div>
    </div>
   
    <input style={{outline: 'none', border: '0px'}}  onChange={check_input} id="answer_box" type="text" autoFocus />
    <div className="card" style={{display: 'none'}} id="win_message">You won</div>
   </>
  );
}

export default App;
