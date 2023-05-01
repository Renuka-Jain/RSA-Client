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

  let signed = '';

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [messagetxt]);

  const encryptMessage = async () => {
    console.log('hola')
    const rsaKeys = await rsa.generateKeys(2048);
    console.log(rsaKeys)
    signed = rsa.MyRsaPrivatKey.sign(messagetxt)
    console.log(signed);
  }

  const signMessage = async () => {

    console.log('log');
    
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
      <button onClick={ () => encryptMessage()}>encrypt</button>
      <button onClick={ () =>signMessage()}>sign</button>
      </div>
      <br />
     
      <div>
      <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange}
        value={signed}
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




