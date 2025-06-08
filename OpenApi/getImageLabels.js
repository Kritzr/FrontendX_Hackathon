const Openai=require('openai');
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')});

const openai=new Openai({
    apiKey:process.env.OPENAI_API_KEY,
});

const getImageLabels = async(url)=>{

    const response=await openai.chat.completions.create({
        model:"gpt-4.1",
        messages: [
            {
            role: "user",
            content: [
                { type: "text", text: "What's in this image?" },
                {
                type: "image_url",
                image_url: {
                    url:url
                }
                }
            ]
            }
        ]
    });
    return response.choices[0].message.content;
}

module.exports={getImageLabels};
