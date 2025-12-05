import React, { useEffect, useRef } from 'react';
import '../styles/SpookyBackground.css';

const SpookyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system for floating spirits
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        if (this.y < -50) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 107, 53, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="spooky-canvas" />
      <div className="floating-elements">
        <div className="floating-ghost ghost-1">👻</div>
        <div className="floating-ghost ghost-2">🎃</div>
        <div className="floating-ghost ghost-3">🦇</div>
        <div className="floating-ghost ghost-4">💀</div>
        <div className="floating-ghost ghost-5">🕷️</div>
      </div>
    </>
  );
};

export default SpookyBackground;