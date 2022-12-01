const { Configuration, OpenAIApi } = require("openai");
import {colorPrompt, furnitureColor} from './prompts.js'
const key = process.env.OPENAI_API_KEY;

export async function run_gpt(user_input) {
    const configuration = new Configuration({
    apiKey: key,
    });
    const gptResponses = {};

    const colorPalette = colorPrompt.concat("\nQuestion: What are four different colors that belong together in a room that can be described as '", user_input, "'?\nAnswer:\n```");

    const openai = new OpenAIApi(configuration);

    try {
        // Get color palette
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: colorPalette,
            temperature: 0,
            max_tokens: 512,
            stop: '```',
            });
        gptResponses['color-palette'] = completion.data.choices[0].text.trim();

        const selectFurnitureColor = furnitureColor.concat("\nQuestion: What colors best suits a table, bed, chair, shelf, beanbag, bookshelf, and walls of a room that can be described as '", user_input, "'? Allowed colors are ", gptResponses['color-palette'], "\nAnswer:\n```");
        // Get furniture colors 
        const completion2 = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: selectFurnitureColor,
            temperature: 0,
            max_tokens: 512,
            stop: '```',
            });
        const furnitureResponse = completion2.data.choices[0].text.trim();
        gptResponses['wall-color'] = furnitureResponse.split('walls: ')[1].split(',')[0];
        gptResponses['bed-color'] = furnitureResponse.split('bed: ')[1].split(',')[0];
        gptResponses['table-color'] = furnitureResponse.split('table: ')[1].split(',')[0];
        gptResponses['chair-color'] = furnitureResponse.split('chair: ')[1].split(',')[0];
        gptResponses['shelf-color'] = furnitureResponse.split('shelf: ')[1].split(',')[0];
        gptResponses['beanbag-color'] = furnitureResponse.split('beanbag: ')[1].split(',')[0];
        gptResponses['bookshelf-color'] = furnitureResponse.split('bookshelf: ')[1].split(',')[0];

        return gptResponses;
        }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        return 'Error';
    }
}