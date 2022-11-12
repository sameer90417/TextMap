import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        console.log("Uppercase was clicked "+ text);
        setText(text.toUpperCase());
        props.showAlert("Converted to uppercase", "success");
    }
    
    const handleLoClick = ()=>{
        console.log("Lowercase was clicked "+ text);
        setText(text.toLowerCase());
        props.showAlert("Converted to lowercase", "success");
    }
    
    const handleClear = ()=>{
        console.log("Clear was clicked "+ text);
        setText("");
        props.showAlert("Text Cleared", "success");
    }
    
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copy to clipboard", "success");
    }
    
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra Spaces removed", "success");
    }
    
    const handleOnChange= (event) => {
        console.log("On change");
        setText(event.target.value);
    }
    
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Hello... I am speaking", "success");
    }

    const [text, setText] = useState('');
    // text = "new text"; // Wrong way to change the state
    // setText("new text") // Correct way to change the state
  return (
    <>
    <div className="container">
        <h4>{props.heading}</h4>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
        </div>
        <button disabled={text.length === 0} className="btn btn-outline-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length === 0} className="btn btn-outline-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button disabled={text.length === 0} className="btn btn-outline-primary mx-1 my-1" onClick={handleCopy}>Copy to Clipboard</button>
        <button disabled={text.length === 0} className="btn btn-outline-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        <button disabled={text.length === 0} className="btn btn-outline-primary mx-1 my-1" onClick={handleClear}>Clear</button>
        <button disabled={text.length === 0} type="submit" onClick={speak} className="btn btn-primary mx-1">Speak</button>
    </div>

    <div className="container my-4">
        <h2>Your text summary</h2>
        <p>{text.split(" ").filter((element)=>{ return element.length !== 0;}).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").filter((element)=>{ return element.length !== 0;}).length} Minutes read</p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
    </div>
    </>
  )
}
