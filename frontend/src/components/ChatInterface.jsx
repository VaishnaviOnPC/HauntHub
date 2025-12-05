import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import VoiceInput from './VoiceInput';
import '../styles/ChatInterface.css';

const ChatInterface = ({ messages, onSendMessage, isProcessing }) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleVoiceInput = (transcript) => {
    if (transcript && !isProcessing) {
      onSendMessage(transcript);
    }
  };

  const quickCommands = [
    "Ghost, dim the lights",
    "Ghost, show me a spooky pumpkin",
    "Ghost, read my notes",
    "Ghost, scare me",
    "Ghost, write a haunted poem"
  ];

  const handleQuickCommand = (command) => {
    if (!isProcessing) {
      onSendMessage(command);
    }
  };

  return (
    <div className="chat-interface">
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isProcessing && (
            <div className="typing-indicator">
              <div className="ghost-avatar">👻</div>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="quick-commands">
        <div className="quick-commands-label">Quick Commands:</div>
        <div className="quick-commands-list">
          {quickCommands.map((command, index) => (
            <button
              key={index}
              className="quick-command-btn"
              onClick={() => handleQuickCommand(command)}
              disabled={isProcessing}
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Speak to the Ghost Butler..."
            className="message-input"
            disabled={isProcessing}
          />
          
          <VoiceInput
            onTranscript={handleVoiceInput}
            isListening={isListening}
            setIsListening={setIsListening}
            disabled={isProcessing}
          />
          
          <button
            type="submit"
            className="send-button"
            disabled={!inputValue.trim() || isProcessing}
          >
            <span className="send-icon">👻</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;