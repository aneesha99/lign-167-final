const { Configuration, OpenAIApi } = require("openai");
import {colorPrompt, furnitureColor, furnitureType} from './prompts.js'
const key = process.env.OPENAI_API_KEY;

export async function run_gpt(user_input) {
    const configuration = new Configuration({
    apiKey: key,
    });
    const gptResponses = {};

    const colorPalette = colorPrompt.concat("\nQuestion: What are five different colors that belong together in a room that can be described as '", user_input, "'?\nAnswer:\n```");

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

        const selectFurnitureColor = furnitureColor.concat("\nQuestion: What colors best suits a table, bed, chair, shelf, couch, wall hanging, and walls of a room that can be described as '", user_input, "'? Allowed colors are ", gptResponses['color-palette'], "\nAnswer:\n```");
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
        gptResponses['couch-color'] = furnitureResponse.split('couch: ')[1].split(',')[0];
        gptResponses['wall-hanging-color'] = furnitureResponse.split('wall hanging: ')[1].split(',')[0];

        // Get furniture types
        // Prompt with more furniture types if there is time
        //const selectFurnitureType = furnitureType.concat("\nQuestion: What type of couch best suits a room that can be described as '", user_input, "'? Allowed types are 'minimalist curved couch with armrest on one side', 'beanbag', 'ottoman', 'cabriole couch'. What type of table best suits a room that can be described as '", user_input, "'? Allowed types are 'basic plain wooden desk', 'round wooden table', 'vanity table'. What type of bed best suits a room that can be described as '", user_input, "'? Allowed types are 'standard plain bed', 'ornate bed' and 'platform bed'. What type of wall hangings best suits a room that can be described as '", user_input, "'? Allowed types are 'bookshelf', 'postcards', 'oil painting with ornate gold frame', 'macrame tapestry'. What type of chair best suits a room that can be described as '", user_input, "'? Allowed types are 'plain wooden chair', 'armchair', 'ornate chair'. What type of shelf best suits a room that can be described as '", user_input, "'? Allowed types are 'dark wooden cabinets', 'steel frame shelves', 'light wooden display shelf'.\nAnswer:\n```")

        const selectFurnitureType = furnitureType.concat("\nQuestion: What type of couch best suits a room that can be described as '", user_input, "'? Allowed types are 'beanbag', 'ottoman'. What type of table best suits a room that can be described as '", user_input, "'? Allowed types are 'basic plain wooden desk', 'round wooden table'. What type of bed best suits a room that can be described as '", user_input, "'? Allowed types are 'standard plain bed'. What type of wall hangings best suits a room that can be described as '", user_input, "'? Allowed types are 'bookshelf', 'postcards', 'oil painting with ornate gold frame', 'macrame tapestry'. What type of chair best suits a room that can be described as '", user_input, "'? Allowed types are 'plain wooden chair', 'armchair'. What type of shelf best suits a room that can be described as '", user_input, "'? Allowed types are 'dark wooden cabinets', 'steel frame shelves', 'light wooden display shelf'.\nAnswer:\n```")

        const completion3 = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: selectFurnitureType,
            temperature: 0,
            max_tokens: 512,
            stop: '```',
            });
        const furnitureTypeResponse = completion3.data.choices[0].text.trim();
        gptResponses['couch-type'] = furnitureTypeResponse.split('couch: ')[1].split(',')[0];
        gptResponses['table-type'] = furnitureTypeResponse.split('table: ')[1].split(',')[0];
        gptResponses['bed-type'] = furnitureTypeResponse.split('bed: ')[1].split(',')[0];
        gptResponses['wall-hangings-type'] = furnitureTypeResponse.split('wall hangings: ')[1].split(',')[0];
        gptResponses['chair-type'] = furnitureTypeResponse.split('chair: ')[1].split(',')[0];
        gptResponses['shelf-type'] = furnitureTypeResponse.split('shelf: ')[1].split(',')[0];

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