import express from 'express';
import cors from 'cors';
import { startSocket } from './config/socket.js';
import { startDB } from './config/connect.js';
import routerAuth from "./routers/auth.js";
import routerChat from './routers/userChat.js';
import routerMessage from './routers/message.js';
import * as dotenv from 'dotenv'
/* config */


dotenv.config();
const port = process.env.PORT || 3000;

const app = express();



app.use(express.json());

app.use(cors({
    origin: [`http://localhost:3000`, `http://localhost:8080`, `http://localhost:5173`,]
}));


app.use("/api/auth", routerAuth);
app.use("/api/chat", routerChat);
app.use("/api/message", routerMessage);




startDB();

const server = app.listen(port, () => {
    console.log('Port is running at: ' + port);
});


/* socket */
startSocket(server);