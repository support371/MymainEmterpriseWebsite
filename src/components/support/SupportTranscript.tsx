'use client';

import { useEffect, useRef } from 'react';
import { Bot, User, AlertTriangle } from 'lucide-react';
import type { SupportMessage } from '@/types/support';

export default function SupportTranscript({ messages }: { messages: SupportMessage[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
        Send a message to start the conversation.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-3 p-4">
      {messages.map((msg) => {
        const isUser = msg.senderType === 'user';
        const isSystem = msg.senderType === 'system';

        if (isSystem) {
          return (
            <div key={msg.id} className="flex items-center gap-2 justify-center text-xs text-amber-400">
              <AlertTriangle className="w-3 h-3" />
              <span>{msg.content}</span>
            </div>
          );
        }

        return (
          <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                isUser
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 border border-slate-700 text-slate-200'
              }`}
            >
              {msg.content}
            </div>
            {isUser && (
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
