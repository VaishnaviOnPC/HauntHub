import React from 'react';
import '../styles/MessageBubble.css';

const MessageBubble = ({ message }) => {
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatContent = (content) => {
    // Handle code blocks
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = content.split(codeBlockRegex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        return (
          <pre key={index} className="code-block">
            <code>{part}</code>
          </pre>
        );
      } else {
        // Regular text, handle line breaks and emphasis
        return (
          <span key={index}>
            {part.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {formatTextEmphasis(line)}
              </React.Fragment>
            ))}
          </span>
        );
      }
    });
  };

  const formatTextEmphasis = (text) => {
    // Handle italic text with *text*
    const italicRegex = /\*(.*?)\*/g;
    const parts = text.split(italicRegex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <em key={index} className="emphasis-text">{part}</em>;
      }
      return part;
    });
  };

  return (
    <div className={`message-bubble ${message.type}`}>
      <div className="message-header">
        <div className="message-avatar">
          {message.type === 'ghost' ? '👻' : '🧑'}
        </div>
        <div className="message-info">
          <span className="message-sender">
            {message.type === 'ghost' ? 'Ghost Butler' : 'You'}
          </span>
          <span className="message-time">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
      
      <div className="message-content">
        {formatContent(message.content)}
      </div>
    </div>
  );
};

export default MessageBubble;