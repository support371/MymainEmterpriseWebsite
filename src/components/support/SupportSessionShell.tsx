'use client';

import { useState, useCallback } from 'react';
import { X, Send, Shield } from 'lucide-react';
import SupportTranscript from './SupportTranscript';
import SupportActionRail from './SupportActionRail';
import type { SupportMessage } from '@/types/support';

interface Props {
  onClose: () => void;
}

type Phase = 'init' | 'consent' | 'chat';

export default function SupportSessionShell({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('init');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const startSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/support/session/start', { method: 'POST' });
      const data = await res.json();
      if (data.session) {
        setSessionId(data.session.id);
        setPhase('consent');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const grantConsent = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      await fetch('/api/support/session/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, granted: true }),
      });
      setPhase('chat');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const sendMessage = useCallback(async () => {
    if (!sessionId || !input.trim()) return;
    const content = input.trim();
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/support/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, content }),
      });
      const data = await res.json();
      if (data.userMessage && data.aiReply) {
        setMessages((prev) => [...prev, data.userMessage, data.aiReply]);
        if (data.escalated) {
          setStatus(`Escalated to ${data.queue}`);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [sessionId, input]);

  const handleEscalate = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/support/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, reason: 'User clicked Request Human' }),
      });
      const data = await res.json();
      if (data.result) {
        setStatus(`Escalated to ${data.result.queue} — Ref: ${data.result.atlassianRef}`);
        setMessages((prev) => [
          ...prev,
          {
            id: `sys_${Date.now()}`,
            sessionId,
            senderType: 'system' as const,
            content: `Escalated to human agent (${data.result.queue}). Reference: ${data.result.atlassianRef}`,
            timestamp: Date.now(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const handleCreateTicket = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ticket/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (data.ticket) {
        setStatus(`Ticket created: ${data.ticket.id}`);
        setMessages((prev) => [
          ...prev,
          {
            id: `sys_${Date.now()}`,
            sessionId,
            senderType: 'system' as const,
            content: `Ticket ${data.ticket.id} created: ${data.ticket.summary}`,
            timestamp: Date.now(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const handleBookHelp = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, type: 'consultation' }),
      });
      const data = await res.json();
      if (data.booking) {
        setStatus(`Booking created: ${data.booking.id}`);
        setMessages((prev) => [
          ...prev,
          {
            id: `sys_${Date.now()}`,
            sessionId,
            senderType: 'system' as const,
            content: `Booking ${data.booking.id} created (${data.booking.type}). Our team will contact you to confirm scheduling.`,
            timestamp: Date.now(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-bold">GEM Concierge Support</h2>
              {status && <p className="text-[10px] text-amber-400">{status}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Init phase */}
        {phase === 'init' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-4 max-w-xs">
              <Shield className="w-12 h-12 text-cyan-500 mx-auto" />
              <h3 className="text-lg font-semibold">Enterprise AI Concierge</h3>
              <p className="text-sm text-slate-400">
                Get instant help with security, billing, consultations, and more.
                Our AI concierge can assist or connect you with a human specialist.
              </p>
              <button
                onClick={startSession}
                disabled={loading}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? 'Starting...' : 'Talk to Concierge'}
              </button>
            </div>
          </div>
        )}

        {/* Consent phase */}
        {phase === 'consent' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 max-w-xs space-y-4">
              <h3 className="text-sm font-bold text-white">Data Processing Consent</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By proceeding, you consent to GEM Cyber processing your support messages
                for the purpose of providing assistance. Your conversation transcript may
                be shared with human support agents if escalation is requested. All data
                is handled in accordance with our enterprise privacy policy.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={grantConsent}
                  disabled={loading}
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-xs font-medium transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Accept & Continue'}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium transition text-slate-300"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat phase */}
        {phase === 'chat' && (
          <>
            <SupportTranscript messages={messages} />

            <SupportActionRail
              sessionId={sessionId}
              disabled={loading}
              onEscalate={handleEscalate}
              onCreateTicket={handleCreateTicket}
              onBookHelp={handleBookHelp}
            />

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-800">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
