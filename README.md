## Citations
Code: https://github.com/designcourse/threejs-webpack-starter - used the three files under 'bundler' to set up webpack to be able to run my application in a web browser.

Code: https://replit.com/@SergeyKarayev/gptpy - referenced to understand how to make calls to the GPT-3 API in gpt.js

Models: Funiture models that I did not create myself were downloaded from PolyHaven and CGTrader. PolyHaven allows use of its models for any purpose and without attribution. CGTrader models I downloaded are also allowed to be used commercially.

## Setup
1. Please ensure you have Node.js and NPM installed on your machine. You can check them by excuting <code>node -v</code> and <code>npm -v</code> in your command line.
2. To install all of the module dependencies necessary, run <code>npm install</code> and the modules from package.json will be installed automatically.
3. Create an environment file in the same directory as this README as shown (replacing 'my-token' with your own OpenAI secret key)
```
OPENAI_API_KEY=my-token
```

## Running the app
Run the command <code> npm run dev </code> on the command line to start the app.
After entering a phrase and clicking 'Create Design', the designed room will be rendered in typically ~30 seconds.
For examples of the app being used, look through examples/examples.md
