import './App.css';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import * as rsa from './rsa'
import * as bigintConversion from 'bigint-conversion'


function App() {
  const apiServer ="http://localhost:3001/";
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [messagetxt, setmessagetxt] = useState<String>("");
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmessagetxt(event.target.value);
  };

  const [messagecypher, setMessagecypher] = useState('');
  let pubkey: rsa.MyRsaPupblicKey;

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [messagetxt]);

  const getserverpublickey = async () => {
    const res = await axios.get(`${apiServer}rsapubkey`);
    // res.data es un json
    pubkey = rsa.MyRsaPupblicKey.fromJSON(res.data);
    console.log(pubkey);
  }

  const encryptMessage = async () => {
    await getserverpublickey(); //asincrona
    const mssgtoBigint:bigint = bigintConversion.textToBigint(messagetxt.toString());
    alert(mssgtoBigint)
    let mssgencrypted = pubkey.encrypt(mssgtoBigint);
    setMessagecypher(bigintConversion.bigintToBase64(mssgencrypted));
    //bigintConversion.bigintToBase64(mssgencrypted);//envia al server
    
  }

  const sendMessage = async () => {
    if (messagetxt==="")
      alert('enter a message');
    else
      await axios.post(`http://localhost:3001/decrypt`,{text: messagecypher});

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
      <button className='encryptbtn' onClick={ () => encryptMessage()} >encrypt</button>
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