import React, {useState} from 'react';
import axios from 'axios';

const AiPage = () => {
    const [prompt, setPrompt] = useState("");
    const [imageURL, setImageURL] = useState("");

    const generateImg = async () => {
        if (!prompt) return alert("Please enter a prompt");
        // setisLoading(true);
        // setImageURL(loadingGIF);
        const response = await axios.post("https://ai-open.herokuapp.com/openai/generate-image", { prompt });
        const image = response.data.image;

        console.log(response);

        setTimeout(() => {
            setImageURL(image);
            // setisLoading(false);
        }, 250);
    };


    return (
        <div>
            <input type="text" placeholder={"prompt"} value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
            <button onClick={generateImg}>generate</button>
            <img src={imageURL} alt="kkk"/>
        </div>
    );
};

export default AiPage;