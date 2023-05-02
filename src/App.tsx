import './App.css';
import React, { useState, useEffect, useRef } from "react";
import * as rsa from './rsa'
import axios from 'axios'


function App() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // The messagetxt of the textarea
  const [messagetxt, setmessagetxt] = useState<String>("");
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmessagetxt(event.target.value);
  };

  const [messagecypher, setMessagecypher] = useState('');
  const [action, setaction] = useState<String>();

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [messagetxt]);

  const getserverpublickey = async () => {
    return await axios.get(`http://localhost:3001/rsapubkeyserver`);
  
  }

  const encryptMessage = async () => {
    setaction("encrypt");

    // const serverpubkey= getserverpublickey()
    // alert(serverpubkey);
    
    // setMessagecypher(serverpubkey.toString());
    // const rsaKeys = await rsa.generateKeys(2048);
    // console.log(rsaKeys)
    
    setMessagecypher('encrypted message: '+ messagetxt!.toString())
  }

  const sendMessage = async () => {
    if (messagetxt==="")
      alert('enter a message')
    else if (action==="sign")
      await axios.post(`http://localhost:3001/signed`,{text: messagecypher.toString()});
    else if (action==="encrypt")
      await axios.post(`http://localhost:3001/encrypted`,{text: messagecypher.toString()});
    else{
      alert('select mode');
    }


  }

  const signMessage = async () => {
    setaction("sign");
    //signed = rsa.MyRsaPrivatKey.sign(messagetxt)

    setMessagecypher('signed message: '+ messagetxt!.toString())
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter here the message.
        </p>
        
        <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange}
        
      ></textarea>
      <div>
      <button className='encryptbtn' onClick={ () => encryptMessage()} style={{ background: action == "encrypt" ? "#9CCC65" : "#EEEEEE" }}>encrypt</button>
      <button className='signbtn' onClick={ () => signMessage()} style={{ background: action === "sign" ? "#9CCC65" : "#EEEEEE" }}>sign</button>
      </div>  
      <br />
     
      <div>
      <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange}
        value={messagecypher}
        className='cyphertxt'
      ></textarea>
      </div>
      <div>
      <button className='sendbtn' onClick={() => sendMessage()}>send</button>
      </div>
      
      </header>
      
    </div>
  );
  
}


export default App;


const styles: { [name: string]: React.CSSProperties } = {
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textareaDefaultStyle: {
    padding: 5,
    width: 400,
    display: "block",
    resize: "none",
    backgroundColor: "#eee",
  },
};




