#  Employee dashboard 

A web application that allows users to interact with  System modles through a simple and user-friendly interface.
This app is for demo purpose to test OpenAI API and may contain issues/bugs.

If you are looking for React.js version check [here](https://github.com/hk202202/emp-project)


[![Watch the video](https://img.youtube.com/vi/_5tFXJQIzi4/0.jpg)](https://drive.google.com/file/d/1P0e2dKb-yYnzU9cJzm3t4o-RAo_qBMv4/view?usp=sharing
)
You can watch the demo video by l=click on the image.
## Features
- User-friendly interface for making requests to the OpenAI API
- Responses are displayed in a chat-like format
- Audio-Text Transcribe (Whisper)
- Highlight code syntax

## Technologies Used
- For client, I haven't used frameworks as this is simple demo version.
- For server, I used express.

## Setup
### Prerequisites
- Node.js
- React.js
- Mongodb API Key
### Installation
1. Clone the repository:
```sh
git clone https://github.com/ioanmo226/chatgpt-web-application
```
2. Install the dependencies:
```sh
npm install
```
3. Create a .env file in the root folder and add your OpenAI API key in the following format:
```sh
OPENAI_API_KEY=your_api_key
```
4. Start node server
```sh
node index.js
```
5. Now when you navigate to http://localhost:3001 you will see web response.

## Usage
- Type in the input field and press enter or click on the send button to make a request to the OpenAI API
- Use control+enter to add line breaks in the input field
- Responses are displayed in the chat-like format on top of the page
- Generate code, including translating natural language to code
- Take advantage of DALL·E models to generate AI images.
- Utilize Whisper Model to transcribe audio into text.

## Contributing
