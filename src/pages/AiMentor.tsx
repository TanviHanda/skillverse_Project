import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AiMentor = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 1. Loading state

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true); // Loading start

    try {
      const response = await fetch('http://localhost:4000/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Loading finish
    }
  };

  return (

    <div className="flex flex-col h-[80vh] w-full bg-gray-900 rounded-lg overflow-hidden">
      

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-4 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
              {msg.role === 'ai' ? (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}


        {isLoading && (
          <div className="text-left p-2">
            <div className="inline-block p-4 rounded-lg bg-gray-700 text-gray-300">
              Mentor is thinking... ⏳
            </div>
          </div>
        )}
      </div>
      
  
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="flex gap-2">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 bg-gray-900 text-white rounded border border-gray-600 focus:outline-none"
            placeholder={isLoading ? "Please wait..." : "Ask your mentor anything..."}
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiMentor;