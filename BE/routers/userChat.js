import express from 'express';
import { createUserChat, findChats, findUserschat } from '../controllers/userChat.js';

const routerChat = express.Router();
routerChat.post('/', createUserChat)
routerChat.get('/:userId', findUserschat)
routerChat.get('/find/:firstId/:secondId', findChats)



export default routerChat

