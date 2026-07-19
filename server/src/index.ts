import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import communityRoutes from './routes/communities.routes.js';
import authRoutes from './routes/auth.routes.js';
import { chatWithAi } from './controllers/ai.controller.js';
import { configureSocket } from './socket.js';
import profileRoutes from './routes/profile.routes.js';
const app = express();
const server = http.createServer(app); 

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://skillverse-project.vercel.app",
    "https://skillverse-project-git-main-tanvis-projects-242fb576.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);         
app.use('/api/communities', communityRoutes);
app.use('/api/profile', profileRoutes);
app.post('/api/ai-chat', chatWithAi);

const io = new Server(server,{
  cors:{
    origin:[
      "http://localhost:5173",
      "https://skillverse-project.vercel.app",
      "https://skillverse-project-git-main-tanvis-projects-242fb576.vercel.app"
    ],
    methods:["GET","POST"]
  }
});

configureSocket(io);

server.listen(4000, () => {
  console.log('Server running on port 4000');
});