import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { api } from '../api/client';

export default function CommunityDetail() {
  const { id } = useParams();
  const [community, setCommunity] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [joined, setJoined] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    const token = localStorage.getItem('skillhub_token');
    const newSocket = io('http://localhost:4000', {
      auth: { token }
    });

    setSocket(newSocket);

    api<any>(`/communities/${id}`).then((data) => {
      setCommunity(data);
      setJoined(data.joined);
    }).catch((err) => console.error("Fetch community failed:", err));

    api<any[]>(`/communities/${id}/messages`).then((data) => {
      setMessages(data);
    }).catch((err) => console.error("Fetch messages failed:", err));

    return () => { newSocket.close(); };
  }, [id]);

  // 2. Handle Socket Events
  useEffect(() => {
    if (!socket) return;

    socket.emit('community:join', id, (res: any) => {
      if (res?.error) console.error("Join Error:", res.error);
    });

    socket.on('community:message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => { socket.off('community:message'); };
  }, [socket, id]);

  const handleJoin = async () => {
    try {
      await api(`/communities/${id}/join`, { method: 'POST' });
      setJoined(true);
      socket?.emit('community:join', id, (res: any) => {
        if (res?.error) console.error("Socket Join Error:", res.error);
        else console.log("Successfully joined chat!");
      });
    } catch (err: any) {
      console.error("Join request failed:", err.message);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.emit('community:message', { communityId: id, body: input });
    setInput('');
  };

  return (
    <div className="p-8 text-white h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{community?.name || "Loading..."}</h1>
          <p className="text-gray-400">{community?.description}</p>
        </div>
        {!joined && false && (
          <button 
            onClick={handleJoin}
            className="bg-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-500"
          >
            Join community
          </button>
        )}
      </div>

      <div className="flex-1 bg-gray-900 rounded-2xl p-6 overflow-y-auto mb-4 border border-gray-800">
        {messages.length === 0 ? (
          <p className="text-gray-600 text-center">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="mb-3">
              <span className="font-bold text-indigo-400">{m.sender?.name || 'User'}: </span>
              <span>{m.body}</span>
            </div>
          ))
        )}
      </div>

      {joined && (
        <div className="flex gap-2">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-800 p-4 rounded-xl border border-gray-700 outline-none"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-indigo-600 px-6 rounded-xl font-bold">Send</button>
        </div>
      )}
    </div>
  );
}