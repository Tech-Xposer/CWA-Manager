
// // import OpenAI from "openai";
const OpenAI = require('openai')
const openai = new OpenAI({
  apiKey: 'sk-t7MB3KWbXtCdKyMMkWoBKxT5M60waIzx7BaFDJVm',
});

const openaiController = async(promptText)=>{
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": `write a long paragraph on the topic: : ${promptText}`
                }
            ],
            max_tokens:1000
            
        })
        return response
    } catch (error) {
        console.error('Error: '+error)
    }
}

module.exports = openaiController




















//    console.log(response.choices[0].message);
// const OpenAI = require('openai');
// const openai = new OpenAI({
//   apiKey: 'sk-t7MB3KWbXtCdKyMMkWoBKxT5M60waIzx7BaFDJVm',
// });

// const openaiController = async (promptText) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: promptText,
//         },
//       ],
//       max_tokens: 2000,
//     });
//     // console.log(response.choices[0].message.content);
//     return response
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// async function main() {
//   const res = await openaiController('write node js program to fetch an API');
//   console.log(res);
// }

// main();
