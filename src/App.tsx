import './App.css';
import React, { useState, useEffect, useRef } from "react";
import * as rsa from './rsa'


function App() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // The messagetxt of the textarea
  const [messagetxt, setmessagetxt] = useState<String>();
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmessagetxt(event.target.value);
  };

  const [messagecypher, setMessagecypher] = useState('');


 

  let signed = '';

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [messagetxt]);

  const encryptMessage = async () => {
    const rsaKeys = await rsa.generateKeys(2048);
    console.log(rsaKeys)
    
   
  }

  const signMessage = async () => {
    signed = rsa.MyRsaPrivatKey.sign(messagetxt)
    
    setMessagecypher('signed message: '+ signed!.toString())
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
      <button className='encryptbtn' onClick={ () => encryptMessage()}>encrypt</button>
      <button className='signbtn' onClick={ () =>signMessage()}>sign</button>
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
      <button>send</button>
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




