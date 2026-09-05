import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Check, Sparkles, SlidersHorizontal, Play, Square } from 'lucide-react';
import { useTTS } from '../lib/useTTS';

export interface SpeakerSpeedControlProps {
  variant?: 'header' | 'inline' | 'compact';
  idPrefix?: string;
  className?: string;
}

export const SPEED_PRESETS = [
  { value: 0.75, label: '0.75x', tag: 'Slow', emoji: '🐢', desc: 'Clear syllables, beginner friendly' },
  { value: 0.85, label: '0.85x', tag: 'Gentle', emoji: '🎧', desc: 'Comfortable learner pace' },
  { value: 1.0, label: '1.0x', tag: 'Normal', emoji: '🎯', desc: 'Standard natural English' },
  { value: 1.2, label: '1.2x', tag: 'Fast', emoji: '⚡', desc: 'Native conversational flow' }
];

export const SpeakerSpeedControl: React.FC<SpeakerSpeedControlProps> = ({
  variant = 'header',
  idPrefix = 'speaker-speed',
  className = ''
}) => {
  const { speed, setSpeed, speak, stop, isSpeaking } = useTTS();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const testPhrase = `Hello! I am speaking at ${speed}x speed. You can practice everyday English with me anytime!`;
  const isTestingSpeaking = isSpeaking(testPhrase);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const handleTestVoice = () => {
    if (isTestingSpeaking) {
      stop();
    } else {
      speak(testPhrase, { rate: speed });
    }
  };

  const currentPreset = SPEED_PRESETS.find(p => Math.abs(p.value - speed) < 0.04);
  const displayLabel = currentPreset ? `${currentPreset.emoji} ${currentPreset.label}` : `🔊 ${speed.toFixed(2)}x`;

  if (variant === 'inline') {
    return (
      <div 
        id={`${idPrefix}-inline-container`}
        className={`p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-3 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-neutral-900 leading-tight">Speakerphone Speed</h4>
              <p className="text-[11px] text-neutral-500">Audio playback rate across all exercises</p>
            </div>
          </div>
          <button
            type="button"
            id={`${idPrefix}-inline-test-btn`}
            onClick={handleTestVoice}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              isTestingSpeaking 
                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
            }`}
          >
            {isTestingSpeaking ? (
              <>
                <Square className="w-3 h-3 fill-current" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Test Voice</span>
              </>
            )}
          </button>
        </div>

        {/* Speed Preset Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SPEED_PRESETS.map((p) => {
            const isSelected = Math.abs(p.value - speed) < 0.04;
            return (
              <button
                key={p.value}
                type="button"
                id={`${idPrefix}-preset-${p.value}`}
                onClick={() => setSpeed(p.value)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-bold ring-2 ring-indigo-500/20'
                    : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700 font-medium'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black">{p.emoji} {p.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />}
                </div>
                <div className="text-[10px] text-neutral-500 truncate mt-0.5">{p.tag}</div>
              </button>
            );
          })}
        </div>

        {/* Fine Tuning Slider */}
        <div className="pt-2 border-t border-neutral-100 flex items-center gap-3 text-xs">
          <span className="text-[11px] font-bold text-neutral-500 shrink-0">Fine Tune:</span>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
            id={`${idPrefix}-inline-slider`}
          />
          <span className="font-extrabold text-neutral-800 text-xs w-12 text-right shrink-0">
            {speed.toFixed(2)}x
          </span>
        </div>
      </div>
    );
  }

  // Header and Compact dropdown button
  return (
    <div className={`relative ${className}`} ref={dropdownRef} id={`${idPrefix}-wrapper`}>
      {/* Trigger Button */}
      <button
        type="button"
        id={`${idPrefix}-toggle-btn`}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
          isOpen
            ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-2xs'
            : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
        }`}
        title={`Speakerphone speed: ${speed}x. Click to change voice speed.`}
      >
        <Volume2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
        <span className="font-extrabold text-neutral-900">{displayLabel}</span>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div 
          id={`${idPrefix}-popover`}
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3.5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-neutral-900">Speakerphone Speed</h4>
                <p className="text-[10px] text-neutral-500">Audio playback pace for learning</p>
              </div>
            </div>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200/60">
              {speed.toFixed(2)}x
            </span>
          </div>

          {/* Preset Grid */}
          <div className="grid grid-cols-2 gap-2">
            {SPEED_PRESETS.map((p) => {
              const isSelected = Math.abs(p.value - speed) < 0.04;
              return (
                <button
                  key={p.value}
                  type="button"
                  id={`${idPrefix}-dropdown-preset-${p.value}`}
                  onClick={() => setSpeed(p.value)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-2xs ring-1 ring-indigo-500/20'
                      : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold">{p.emoji} {p.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />}
                  </div>
                  <div className="text-[10px] font-medium text-neutral-500 mt-0.5">{p.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Precision Slider */}
          <div className="pt-2 border-t border-neutral-100 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-600">
              <span className="flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
                Custom Speed
              </span>
              <span className="text-indigo-700 font-extrabold">{speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
              id={`${idPrefix}-dropdown-slider`}
            />
            <div className="flex justify-between text-[9px] text-neutral-400 font-bold">
              <span>0.5x Slow</span>
              <span>1.0x Normal</span>
              <span>1.5x Fast</span>
            </div>
          </div>

          {/* Test Speakerphone Button */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
            <button
              type="button"
              id={`${idPrefix}-popover-test-btn`}
              onClick={handleTestVoice}
              className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isTestingSpeaking
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white'
              }`}
            >
              {isTestingSpeaking ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Speaking</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Test Speakerphone ({speed}x)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
