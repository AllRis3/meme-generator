import React from 'react';


export default function Meme() {
    
    const [memeData, setMemeData] = React.useState({
        topText:"",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"    
    })

    const [allMemes , setAllMemes] = React.useState([])
    
    React.useEffect(()=>{
            fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes) )
    }, [])

    
    function GetMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMemeData(prevMemeData => ({
            ...prevMemeData,
            randomImage: url
        }))
    }
    function handleChange(event){
        const{name, value} = event.target
        setMemeData(prevMemeData=>({
            ...prevMemeData,
            [name] : value
        }))
    }

  return (
    <div className='memeSection'>
        <div className='inputSection'>
            <input 
                type="text" 
                placeholder='Top text'
                onChange={handleChange}
                name="topText"
                value={memeData.topText}
                />
            <input
                 type="text"
                 placeholder='Bottom text'
                 onChange={handleChange}
                 name="bottomText"
                 value={memeData.bottomText}
                 />
        </div>

        <button    
            onClick={GetMemeImage}
        >Get a new meme image
        </button>
        <div className='meme'>
        <img src={memeData.randomImage} className="meme--image" />
        <h2 className='top--text'>{memeData.topText}</h2>
        <h2 className='bottom--text'> {memeData.bottomText}</h2>
        </div>

    </div>
  )
}

