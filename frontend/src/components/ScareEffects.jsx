import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import '../styles/ScareEffects.css';

const ScareEffects = forwardRef(({ effect }, ref) => {
  const [activeEffect, setActiveEffect] = useState(null);
  const [showJumpScare, setShowJumpScare] = useState(false);

  useImperativeHandle(ref, () => ({
    triggerEffect: (effectConfig) => {
      setActiveEffect(effectConfig);
    }
  }));

  useEffect(() => {
    if (effect) {
      setActiveEffect(effect);
    }
  }, [effect]);

  useEffect(() => {
    if (!activeEffect) return;

    const { type, duration } = activeEffect;

    switch (type) {
      case 'jump_scare':
        setShowJumpScare(true);
        setTimeout(() => setShowJumpScare(false), duration);
        break;
      
      case 'screen_shake':
        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), duration);
        break;
      
      case 'flash_lights':
        document.body.classList.add('flash-lights');
        setTimeout(() => document.body.classList.remove('flash-lights'), duration);
        break;
      
      case 'ghostly_whisper':
        // This could trigger a subtle text animation or sound
        document.body.classList.add('ghostly-whisper');
        setTimeout(() => document.body.classList.remove('ghostly-whisper'), duration);
        break;
    }

    // Clear the effect after it's done
    setTimeout(() => setActiveEffect(null), duration);
  }, [activeEffect]);

  return (
    <>
      {showJumpScare && (
        <div className="jump-scare-overlay">
          <div className="jump-scare-ghost">
            <div className="ghost-face">👻</div>
            <div className="scare-text">BOO!</div>
          </div>
        </div>
      )}
      
      {activeEffect?.type === 'ghostly_whisper' && (
        <div className="ghostly-whisper-overlay">
          <div className="whisper-text">
            The spirits whisper...
          </div>
        </div>
      )}
    </>
  );
});

ScareEffects.displayName = 'ScareEffects';

export default ScareEffects;