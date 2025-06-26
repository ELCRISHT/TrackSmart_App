const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', authRoutes);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Socket.io signaling server for WebRTC
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (roomId, userId, role) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        // Store role in socket object for access control
        socket.role = role;

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
        });

        socket.on('signal', (data) => {
            socket.to(roomId).emit('signal', data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
   