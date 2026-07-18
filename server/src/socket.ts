import type { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { prisma } from './lib/prisma.js';

export function configureSocket(io: Server) {
  // 1. Middleware
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Unauthorized'));
      
      socket.data.user = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  // 2. Connection logic
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.data.user.userId);

    // Join community
    socket.on('community:join', async (communityId: string, callback?: Function) => {
      const member = await prisma.communityMember.findUnique({
        where: { 
          userId_communityId: { userId: socket.data.user.userId, communityId } 
        }
      });

      if (!member) return callback?.({ error: 'Membership required' });
      
      socket.join(`community:${communityId}`);
      callback?.({ ok: true });
    });

    // Send message
    socket.on('community:message', async ({ communityId, body }: { communityId: string; body: string }, callback?: Function) => {
      if (!body?.trim() || body.length > 2000) return callback?.({ error: 'Invalid message' });

      const member = await prisma.communityMember.findUnique({
        where: { 
          userId_communityId: { userId: socket.data.user.userId, communityId } 
        }
      });

      if (!member) return callback?.({ error: 'Membership required' });

      const message = await prisma.chatMessage.create({
        data: { 
          communityId, 
          senderId: socket.data.user.userId, 
          body: body.trim() 
        },
        include: { 
          sender: { select: { id: true, name: true, avatarUrl: true } } 
        }
      });

      io.to(`community:${communityId}`).emit('community:message', message);
      callback?.({ ok: true });
    });
  });
}