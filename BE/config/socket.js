import { Server } from 'socket.io';

export const startSocket = (server) => {
    /* socket */
    const io = new Server(server, {
        cors: {
            origin: [`http://localhost:3000`, `http://localhost:8080`, `http://localhost:5173`,],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            creadentials: true,
        },
    });

    let usersOnline = []
    io.on('connection', (socket) => {
        socket.on("statusUsers", (yourId) => {
            !usersOnline.some(user => user.id === yourId) &&
                usersOnline.push({
                    yourId,
                    socketId: socket.id
                })
            io.emit("getUsersOnline", usersOnline)
        })
        socket.on("sendMessage", (message) => {
            const user = usersOnline.find(user => user.yourId === message.receiver)
            if (user) {
                console.log(message);
                io.to(user?.socketId).emit("getMessage", message)
                io.to(user?.socketId).emit("getNotification", {
                    chatId: message.chatId,
                    senderId: message.senderId,
                    isRead: false,
                    date: new Date()
                })

            }
        })
        socket.on('disconnect', async () => {
            usersOnline = usersOnline.filter(user => user.socketId !== socket.id)
            io.emit("getUsersOnline", usersOnline)
        });
    })


};