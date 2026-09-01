import React, { useState } from 'react';
import { SavedPhrase } from '../types';
import { 
  Bookmark, 
  Check, 
  Copy, 
  Trash2, 
  X, 
  Sparkles, 
  Send, 
  Volume2, 
  VolumeX,
  BarChart3,
  List,
  Filter,
  BookOpen,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTTS } from '../lib/useTTS';
import { GrammarAnalyticsDashboard, categorizePhrase } from './GrammarAnalyticsDashboard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  savedPhrases: SavedPhrase[];
  onDeletePhrase: (id: string) => Promise<void>;
  onSendToChat?: (text: string) => void;
  onOpenFlashcards?: (deckId?: string) => void;
}

export function SavedPhrasesModal({ isOpen, onClose, savedPhrases, onDeletePhrase, onSendToChat, onOpenFlashcards }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'phrases' | 'analytics'>('phrases');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { speak, isSpeaking, isSupported } = useTTS();

  const handleCopy = async (phrase: SavedPhrase) => {
    try {
      await navigator.clipboard.writeText(phrase.professional);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleToggleSpeak = (text: string) => {
    speak(text, { rate: 0.92 });
  };

  const filteredPhrases = selectedCategory
    ? savedPhrases.filter((p) => categorizePhrase(p) === selectedCategory)
    : savedPhrases;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl border border-neutral-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-neutral-900 my-6"
        >
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-800">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-neutral-900">Saved Phrases & Error Analytics</h2>
                <p className="text-xs text-neutral-500">Firebase Cloud Library & D3.js Grammar Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Tab Switcher */}
              <div className="flex items-center bg-neutral-200/70 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('phrases')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'phrases'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Phrases ({savedPhrases.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'analytics'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>D3 Analytics</span>
                </button>
                {onOpenFlashcards && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenFlashcards('saved-vault');
                    }}
                    className="px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-emerald-800 hover:bg-emerald-100/70 cursor-pointer font-bold"
                    title="Practice all saved phrases in interactive 3D Flashcards"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Practice Deck</span>
                  </button>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* If Analytics tab is active or show analytics widget */}
            {activeTab === 'analytics' ? (
              <div className="space-y-4">
                <GrammarAnalyticsDashboard
                  savedPhrases={savedPhrases}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Filtered Phrases Section beneath Analytics */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      {selectedCategory ? `Phrases in "${selectedCategory}"` : 'All Saved Phrases'} ({filteredPhrases.length})
                    </h4>
                    {selectedCategory && (
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-xs text-emerald-600 font-semibold hover:underline cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>

                  {filteredPhrases.length === 0 ? (
                    <div className="p-8 text-center bg-neutral-50 rounded-2xl border border-neutral-200/70 text-neutral-400 text-xs">
                      No phrases found in this category.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPhrases.slice(0, 10).map((phrase) => {
                        const speaking = isSpeaking(phrase.professional);
                        return (
                          <div
                            key={phrase.id}
                            className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/70 hover:border-neutral-300 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <span className="text-[11px] font-semibold bg-white px-2 py-0.5 rounded-md border border-neutral-200 text-emerald-800">
                                {categorizePhrase(phrase)}
                              </span>
                              <div className="flex items-center gap-1">
                                {isSupported && (
                                  <button
                                    onClick={() => handleToggleSpeak(phrase.professional)}
                                    className="p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer"
                                    title="Listen"
                                  >
                                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleCopy(phrase)}
                                  className="p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer"
                                  title="Copy"
                                >
                                  {copiedId === phrase.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="space-y-1.5 text-xs">
                              <div className="text-neutral-500 italic">"{phrase.original}"</div>
                              <div className="font-semibold text-emerald-900 bg-white p-2.5 rounded-xl border border-emerald-100">
                                {phrase.professional}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Phrases List Tab */
              <div className="space-y-4">
                {/* Embedded Mini D3 Analytics Banner */}
                {savedPhrases.length > 0 && (
                  <GrammarAnalyticsDashboard
                    savedPhrases={savedPhrases}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                )}

                {/* Filter indicator */}
                {selectedCategory && (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Filter className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Filtered by: <strong>{selectedCategory}</strong> ({filteredPhrases.length} items)</span>
                    </span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="font-bold text-[11px] text-emerald-700 hover:underline cursor-pointer"
                    >
                      Show All
                    </button>
                  </div>
                )}

                {/* Phrases Cards List */}
                {filteredPhrases.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400">
                    <Bookmark className="w-12 h-12 mx-auto mb-3 text-neutral-300 stroke-1" />
                    <p className="font-medium text-neutral-600">
                      {selectedCategory ? 'No phrases found in this filter' : 'No saved phrases yet'}
                    </p>
                    <p className="text-xs mt-1 max-w-xs mx-auto">
                      {selectedCategory 
                        ? 'Try selecting a different grammatical category or resetting the filter.'
                        : 'Click the "Save" button on any coach result card to build your personalized vocabulary library.'}
                    </p>
                  </div>
                ) : (
                  filteredPhrases.map((phrase) => {
                    const speaking = isSpeaking(phrase.professional);
                    return (
                      <div
                        key={phrase.id}
                        className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/70 hover:border-neutral-300 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider flex-wrap">
                            <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                              {categorizePhrase(phrase)}
                            </span>
                            {phrase.mode && (
                              <span className="bg-white px-2 py-0.5 rounded-md border border-neutral-200 text-neutral-700 text-[10px]">
                                {phrase.mode}
                              </span>
                            )}
                            {phrase.jobType && (
                              <span className="bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200 text-neutral-800 text-[10px]">
                                {phrase.jobType}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {isSupported && (
                              <button
                                onClick={() => handleToggleSpeak(phrase.professional)}
                                title={speaking ? "Stop listening" : "Listen to pronunciation"}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 text-xs ${
                                  speaking 
                                    ? 'bg-emerald-600 border-emerald-600 text-white animate-pulse' 
                                    : 'bg-white border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:border-emerald-300'
                                }`}
                              >
                                {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                                <span className="hidden sm:inline">{speaking ? 'Stop' : 'Listen'}</span>
                              </button>
                            )}
                            {onSendToChat && (
                              <button
                                onClick={() => {
                                  onSendToChat(phrase.professional);
                                  onClose();
                                }}
                                title="Send to Google Chat"
                                className="p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                              >
                                <Send className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="hidden sm:inline">Google Chat</span>
                              </button>
                            )}
                            <button
                              onClick={() => handleCopy(phrase)}
                              title="Copy professional English"
                              className="p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer"
                            >
                              {copiedId === phrase.id ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => onDeletePhrase(phrase.id)}
                              title="Delete from saved"
                              className="p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-400 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="text-[11px] font-semibold text-neutral-400 uppercase">Original</div>
                            <p className="text-sm text-neutral-600 italic">"{phrase.original}"</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-emerald-100 text-emerald-950">
                            <div className="text-[11px] font-semibold text-emerald-700 uppercase flex items-center gap-1 mb-0.5">
                              <Sparkles className="w-3 h-3" /> Professional Version
                            </div>
                            <p className="text-sm font-medium">{phrase.professional}</p>
                          </div>
                          {phrase.translation && (
                            <div className="text-xs text-neutral-700 bg-neutral-100/90 p-2.5 rounded-xl flex items-center gap-2 border border-neutral-200/60">
                              <Languages className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="font-medium">{phrase.translation}</span>
                            </div>
                          )}
                          {phrase.why && (
                            <p className="text-xs text-neutral-500">
                              <span className="font-semibold text-neutral-600">Why:</span> {phrase.why}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-between items-center text-xs text-neutral-500">
            <span>
              {savedPhrases.length} phrase{savedPhrases.length === 1 ? '' : 's'} saved • D3 Analytics Ready
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
