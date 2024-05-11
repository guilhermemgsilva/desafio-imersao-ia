const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {GoogleGenerativeAI} = require("@google/generative-ai");
dotenv.config();

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);



const app = express();
const port = process.env.PORT || 3000;

// Configure CORS para permitir requisições do seu frontend
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
    
    const historico = req.body.history
    
    const pergunta = req.body.pergunta
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    
    const chat = model.startChat({
        history: historico,
    })
    

    const mensagem = pergunta
    const result = await chat.sendMessage(mensagem);
    const response = result.response;
    res.send(response.text())
 });

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});