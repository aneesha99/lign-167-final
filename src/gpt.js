const { Configuration, OpenAIApi } = require("openai");
const prompt = "Your task is to answer questions correctly. You have access to a Javascript interpreter, so if you are not able to answer a question from memory, you can write a program that will answer the question. Always write your answer as a valid Javascript program, with helpful comments.\n\nBegin.\n\nQuestion: What is 37593 * 67?\nAnswer:\n```\n// Multiply the numbers\n(37593 * 67)\n```\n\nQuestion: What is the id of Github user aneesha99?\nAnswer:\n```\nconst APIResponse = await fetch('https://api.github.com/users/aneesha99');\nconst gitHubUser = await APIResponse.json();\n(gitHubUser.login)\n```\n\nQuestion: What year was the American president George Washington born?\nAnswer:\n```\n(1732)\n```\n";
const key = process.env.OPENAI_API_KEY;

export async function run_gpt(user_input) {
    const configuration = new Configuration({
    apiKey: key,
    });

    const fileData = prompt.concat("\nQuestion: ", user_input, "\nAnswer:\n```");

    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: fileData,
            temperature: 0,
            max_tokens: 512,
            stop: '```',
            });

        let output = eval(completion.data.choices[0].text.trim());
        return output;
        }
    catch (error) {
        console.log('key: ', key);
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        return 'Error';
    }
}