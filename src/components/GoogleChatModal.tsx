import React, { useState, useEffect } from 'react';
import { ChatSpace, ChatMessage, fetchSpaces, fetchMessages, sendChatMessage } from '../lib/googleChat';
import { getAccessToken, signInWithGoogleChat } from '../lib/firebase';
import { 
  MessageSquare, 
Send, 
  RefreshCw, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  LogIn, 
  Lock, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
type ChatMsg = { role: "user" | "assistant" | "system", content: string};
import {motion, AnimatePresence } from 'motion/react';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTextToSend?: string;
  onSelectForCoaching?: (text: string) => void;
}

export function GoogleChatModal({ isOpen, onClose, initialTextToSend = '', onSelectForCoaching }: Props) {
  const [spaces, setSpaces] = useState<ChatSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<ChatSpace | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textToSend, setTextToSend] = useState(initialTextToSend);
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  type ChatMsg = { role: "user" | "assistant" | "system", content: stringify};
  const [aiMessages, setAiMessages] = useState<ChatMsg[]>([
   {role: "system", content: "You are ProEnglishCoach. You help people learn English, Use the conversation history. Dont repeat greetings."}
    ]);
  ]);
  const [input, setInput] = useState(initialTextToSend || "");
                  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [showConfirmSend, setShowConfirmSend] = useState(false);

  useEffect(() => {
    if (initialTextToSend) {
      setTextToSend(initialTextToSend);
    }
  }, [initialTextToSend]);

  useEffect(() => {
    if (isOpen) {
      loadSpaces();
    } else {
      setError(null);
      setSuccessMessage(null);
      setShowConfirmSend(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedSpace) {
      loadMessages(selectedSpace.name);
    } else {
      setMessages([]);
    }
  }, [selectedSpace]);

  const loadSpaces = async () => {
    setIsLoadingSpaces(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        setNeedsAuth(true);
        setIsLoadingSpaces(false);
        return;
      }
      setNeedsAuth(false);
      const fetchedSpaces = await fetchSpaces(token);
      setSpaces(fetchedSpaces);
      if (fetchedSpaces.length > 0 && !selectedSpace) {
        setSelectedSpace(fetchedSpaces[0]);
      }
    } catch (err: any) {
      console.error('Error loading Google Chat spaces:', err);
      if (err?.message?.includes('401') || err?.message?.includes('UNAUTHENTICATED') || err?.message?.includes('Invalid Credentials')) {
        setNeedsAuth(true);
      } else {
        setError(err?.message || 'Failed to load Google Chat spaces. Please ensure permissions are granted.');
      }
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  const loadMessages = async (spaceName: string) => {
    setIsLoadingMessages(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        setNeedsAuth(true);
        return;
      }
      const fetchedMessages = await fetchMessages(spaceName, token);
      setMessages(fetchedMessages);
    } catch (err: any) {
      console.error('Error loading messages:', err);
      setError(err?.message || 'Could not load messages for this space.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleGoogleConnect = async () => {
    try {
      setError(null);
      const res = await signInWithGoogleChat();
      if (res?.accessToken) {
        setNeedsAuth(false);
        loadSpaces();
      }
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        return;
      }
      setError('Google authorization failed: ' + (err?.message || 'Unknown error'));
    }
  };

  const handleInitiateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textToSend.trim() || !selectedSpace) return;
    setShowConfirmSend(true);
  };

  const handleConfirmSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMsg = { role: "user", content: input };
    const updatedAiMessages = [...aiMessages, userMessage];
    setAiMessages(updatedAiMessages);
    setInput("");
    setIsSending(true);
    setError(null);
    
    try {
    const reply = await sendChatMessage(updatedAiMessages);
    setAiMessages([...updatedAiMessages, {role: "assistant", content: reply }]);
  } catch (error) {
    console.error(error);
      setError("Failed to get AI response");
    } finally {
      setIsSending(false);
    }
  };
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Send message error:', err);
      setError(err?.message || 'Failed to send message to Google Chat.');
      setShowConfirmSend(false);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        className="bg-white rounded-3xl shadow-2xl border border-neutral-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-neutral-900"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/90">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-2xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-neutral-900">Google Chat Workspace</h2>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Connected
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Send professional messages & practice replying to colleagues with permission
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Status / Alert Messages */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="font-medium">{successMessage}</div>
            </div>
          )}

          {needsAuth ? (
            <div className="text-center py-10 px-4 bg-neutral-50 rounded-2xl border border-neutral-200/80">
              <div className="w-12 h-12 bg-white rounded-2xl border border-neutral-200 shadow-2xs flex items-center justify-center mx-auto mb-3 text-neutral-700">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">Google Chat Authorization Required</h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto mb-5">
                Sign in with Google and grant Google Chat permissions to load your spaces and send professional communications.
              </p>
              <button
                onClick={handleGoogleConnect}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium text-sm transition-all shadow-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Authorize Google Chat</span>
              </button>
            </div>
          ) : (
            <>
              {/* Space Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-neutral-500" /> Select Google Chat Space / DM
                  </label>
                  <button
                    onClick={loadSpaces}
                    disabled={isLoadingSpaces}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingSpaces ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                {isLoadingSpaces ? (
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                    Loading your Google Chat spaces...
                  </div>
                ) : spaces.length === 0 ? (
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-500 text-center">
                    No active spaces found in your Google Chat account.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {spaces.map((space) => {
                      const isSelected = selectedSpace?.name === space.name;
                      return (
                        <button
                          key={space.name}
                          type="button"
                          onClick={() => setSelectedSpace(space)}
                          className={`p-3 rounded-2xl text-left border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400/50 shadow-2xs'
                              : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <p className="font-semibold truncate">{space.displayName || 'Direct Message'}</p>
                            <span className="text-[10px] text-neutral-400 font-normal capitalize">
                              {space.spaceType || space.type || 'Chat Space'}
                            </span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Compose & Send Section */}
              <div className="bg-neutral-50/70 p-4 rounded-2xl border border-neutral-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Message to Send
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Destination: <strong className="text-neutral-700">{selectedSpace?.displayName || 'Select a space'}</strong>
                  </span>
                </div>
                <textarea
                  value={textToSend}
                  onChange={(e) => setTextToSend(e.target.value)}
                  placeholder="Paste or type your polished English response to send to Google Chat..."
                  rows={3}
                  className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500 outline-none resize-none shadow-2xs"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleInitiateSend}
                    disabled={!textToSend.trim() || !selectedSpace || isSending}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-medium text-xs rounded-xl shadow-2xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Google Chat</span>
                  </button>
                </div>
              </div>

              {/* Space Thread & Practice Hub */}
              {selectedSpace && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Recent Space Messages & Practice
                    </h3>
                    <span className="text-[11px] text-neutral-400">
                      Click "Coach Reply" to draft a professional response
                    </span>
                  </div>

                  {isLoadingMessages ? (
                    <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                      Loading recent conversation messages...
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-400">
                      No recent messages found in this space.
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {messages.map((msg) => (
                        <div
                          key={msg.name}
                          className="bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-neutral-800">
                                {msg.sender?.displayName || 'Colleague'}
                              </span>
                              {msg.createTime && (
                                <span className="text-[10px] text-neutral-400">
                                  {new Date(msg.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>
                            <p className="text-neutral-700 leading-relaxed">{msg.text}</p>
                          </div>
                          {onSelectForCoaching && msg.text && (
                            <button
                              onClick={() => {
                                onSelectForCoaching(msg.text!);
                                onClose();
                              }}
                              className="px-2.5 py-1.5 bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-800 border border-neutral-200 text-neutral-600 rounded-lg text-[11px] font-semibold transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                              title="Send this message to Coach to craft a professional reply"
                            >
                              <span>Coach Reply</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Mandatory Explicit Confirmation Dialog */}
        {showConfirmSend && selectedSpace && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-neutral-200 space-y-4 text-neutral-900"
            >
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-800">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900">Confirm Sending to Google Chat</h3>
                  <p className="text-xs text-neutral-500">Explicit confirmation required</p>
                </div>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 text-xs space-y-2">
                <div>
                  <span className="font-semibold text-neutral-500 uppercase text-[10px]">Target Space:</span>
                  <p className="font-bold text-neutral-800">{selectedSpace.displayName || 'Direct Conversation'}</p>
                </div>
                <div>
                  <span className="font-semibold text-neutral-500 uppercase text-[10px]">Message Content:</span>
                  <p className="text-neutral-700 bg-white p-2.5 rounded-xl border border-neutral-200/80 font-medium">
                    "{textToSend}"
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-500">
                With your permission, this message will be posted directly to the selected Google Chat conversation.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmSend(false)}
                  disabled={isSending}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSend}
                  disabled={isSending}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm & Send</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/70 flex justify-between items-center text-xs text-neutral-500">
          <span>Google Workspace Integration • Google Chat API</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
