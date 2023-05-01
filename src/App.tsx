import './App.css';
import React, { useState, useEffect, useRef } from "react";


function App() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // The messagetxt of the textarea
  const [messagetxt, setmessagetxt] = useState<String>();
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmessagetxt(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [messagetxt]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter here the message.
        </p>
        <form action="/">
        <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange}
        
      ></textarea>
<div className="buttons">

<div className="action_btn">

<button name="submit" className="action_btn submit" type="submit" value="Encrypt" >Encrypt</button>
<button name="submit" className="action_btn cancel" type="submit" value="Sign">Submit</button>

<p id="saved"></p>

</div>

</div>
      <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange}
        
      ></textarea>
      <input type="submit" value="Send"/>

      </form>
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


