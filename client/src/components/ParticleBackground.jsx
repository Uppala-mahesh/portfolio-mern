import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let shootingStars = [];
    let mouseX = 0, mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 180);
      for (let i = 0; i < count; i++) {
        const layer = Math.random();
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: layer < 0.6 ? Math.random() * 1.2 + 0.3 : Math.random() * 2 + 0.8,
          speedX: (Math.random() - 0.5) * (layer < 0.6 ? 0.15 : 0.3),
          speedY: (Math.random() - 0.5) * (layer < 0.6 ? 0.15 : 0.3),
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          layer: layer,
          hue: Math.random() < 0.3 ? 280 : Math.random() < 0.5 ? 190 : 260
        });
      }
    };

    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          life: 1
        });
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = time * 0.001;

      // Draw nebula glow clouds
      const grd1 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.3, 0,
        canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.3
      );
      grd1.addColorStop(0, 'rgba(124, 58, 237, 0.025)');
      grd1.addColorStop(1, 'transparent');
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grd2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.6, 0,
        canvas.width * 0.8, canvas.height * 0.6, canvas.width * 0.25
      );
      grd2.addColorStop(0, 'rgba(34, 211, 238, 0.015)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((s, i) => {
        const parallaxX = (mouseX - canvas.width / 2) * 0.01 * s.layer;
        const parallaxY = (mouseY - canvas.height / 2) * 0.01 * s.layer;
        
        s.x += s.speedX;
        s.y += s.speedY;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        const twinkle = Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset) * 0.3 + 0.7;
        const drawX = s.x + parallaxX;
        const drawY = s.y + parallaxY;

        ctx.beginPath();
        ctx.arc(drawX, drawY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 70%, 75%, ${s.opacity * twinkle})`;
        ctx.fill();

        // Glow for brighter stars
        if (s.size > 1.2) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 70%, 75%, ${s.opacity * twinkle * 0.08})`;
          ctx.fill();
        }

        // Connection lines for nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const dx = drawX - (stars[j].x + (mouseX - canvas.width/2) * 0.01 * stars[j].layer);
          const dy = drawY - (stars[j].y + (mouseY - canvas.height/2) * 0.01 * stars[j].layer);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(
              stars[j].x + (mouseX - canvas.width/2) * 0.01 * stars[j].layer,
              stars[j].y + (mouseY - canvas.height/2) * 0.01 * stars[j].layer
            );
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });

      // Shooting stars
      spawnShootingStar();
      shootingStars = shootingStars.filter(ss => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life -= 0.015;
        ss.opacity = ss.life;

        if (ss.life <= 0) return false;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;
        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity * 0.8})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => { resize(); createStars(); };
    const handleMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };

    resize();
    createStars();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
