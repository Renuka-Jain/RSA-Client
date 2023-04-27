import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter here the message.
        </p>
        <form action="/">
        <textarea id="freeform" name="freeform" rows="4" cols="50"/><br></br>
        <input type="submit" value="Submit"/>
      </form>
      </header>
      
    </div>
  );
}

export default App;
