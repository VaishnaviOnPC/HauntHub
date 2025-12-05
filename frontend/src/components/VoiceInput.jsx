import React, { useState, useEffect, useRef } from 'react';
import '../styles/VoiceInput.css';

const VoiceInput = ({ onTranscript, isListening, setIsListening, disabled }) => {
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript, setIsListening]);

  const toggleListening = () => {
    if (!recognitionRef.current || disabled) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  if (!isSupported) {
    return null; // Hide the button if speech recognition is not supported
  }

  return (
    <button
      type="button"
      className={`voice-button ${isListening ? 'listening' : ''}`}
      onClick={toggleListening}
      disabled={disabled}
      title={isListening ? 'Stop listening' : 'Start voice input'}
    >
      {isListening ? (
        <div className="listening-animation">
          <span className="mic-icon">🎤</span>
          <div className="sound-waves">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
      ) : (
        <span className="mic-icon">🎤</span>
      )}
    </button>
  );
};

export default VoiceInput;