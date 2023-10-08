import React, { useState } from 'react';
import axios from 'axios'

export default function Login(props){
    

    const reGenerate = ()=>{
        axios.post('http://localhost:3008/api/generate',{query:text})
        .then(response => {
          setText(response.data.content);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    const [text, setText] = useState('')
    const handleUppercase = ()=>{
        setText(text.toUpperCase())
        
    }
    const handleLowercase = ()=>{
        setText(text.toLowerCase())
        
    }

   

    const handleClearText = ()=>{
        // let newText = ''
        // let puncArr=['.',',','/',';',':',"'",'"','<','>','\\','|','~','`']
        // for(let x of text){
        //     if(puncArr.includes(x)){console.log(x);}
        //     else newText+=x
        // }
        // setText(newText)
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        
    }
    const handleMute = ()=>{
        window.speechSynthesis.cancel()
    }
    const handleChange = (event)=>{
        setText(event.target.value)
    }
    return (
        <>
            <div className="container my-3">
                
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" onChange={handleChange} rows="8" value={text}></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleUppercase}>Convert to upper</button>
                <button className="btn btn-primary mx-3" onClick={handleLowercase}>Convert to Lower</button>
                <button className="btn btn-primary " onClick={handleClearText}>Speak</button>
                <button className="btn btn-danger mx-3" onClick={handleMute}>Mute</button>
                <button className="btn btn-danger " onClick={reGenerate}>Generate Text</button>
                
                

            </div>
            <div className="container my-3">
                <h1>Total Words and Characters</h1>
                {/* <p>{ text.split(' ').length } words and {text.length} characters</p> */}
            </div>
        </>
    )
} 