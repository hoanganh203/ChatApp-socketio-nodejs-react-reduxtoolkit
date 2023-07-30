import express from 'express';
import { createMessage, getMessage } from '../controllers/message.js';

const routerMessage = express.Router();
routerMessage.post('/', createMessage)
routerMessage.get('/:chatId', getMessage)



export default routerMessage