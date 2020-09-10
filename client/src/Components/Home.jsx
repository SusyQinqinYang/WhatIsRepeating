import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
    let [word, setWord] = useState('');
    let [AIWord, setAIWord] = useState('');

    const submitWord = (e) =>{
        e.preventDefault();
        if (word.length !== 0) {
            axios({
                method:"post",
                url:"/post",
                data:{
                    text:word
                }
            })
            .then(({data})=>{
                setAIWord(data);
            })
            .catch(err => {console.log('==>post err:',err)})
        }
    }

    return (
        <div>
            <div className="description">
                <p>Hi, My name is Amy and I am an AI from the far ocean. <br/> 
                I can read what is repeating in your mind. <br/>
                <span style={{"fontSize":"18px", "color":"blueviolet"}}>Note: Try to trick me with lower and upper cases!</span> 
                </p>
                <h4>Don't believe me? Try Me!</h4>
            </div>
            <form onSubmit={submitWord}>
                <input type="text" placeholder="Word with repetitive letters" onChange={(e) => {setWord(e.target.value)}} style={{"width":"200px"}}/>
                <input type="submit" value="Try Amy" style={{"marginLeft":"10px"}}/>
            </form>
            <div>{AIWord}</div>
        </div>
    )
}

export default Home;