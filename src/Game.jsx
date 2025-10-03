
import React, { useEffect, useRef } from 'react';

const tokens = ['/tokens/btc.png','/tokens/eth.png','/tokens/sol.png','/tokens/doge.png']

export default function Game({ onEnd }) {
  const canvasRef = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let snake = [{x:50,y:50}];
    let food = {x:100,y:100, img: tokens[Math.floor(Math.random()*tokens.length)]};
    let dx = 10, dy = 0;
    let score = 0;
    let running = true;
    const imgCache = {}

    function draw() {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0,0,320,320);
      ctx.fillStyle = '#10b981';
      snake.forEach(s => ctx.fillRect(s.x,s.y,10,10));
      if(food.img) {
        const src = food.img
        if(!imgCache[src]) {
          const img = new Image()
          img.src = src
          img.onload = ()=> { imgCache[src]=img }
        } else {
          ctx.drawImage(imgCache[src], food.x, food.y, 10, 10)
        }
      } else {
        ctx.fillStyle = '#f59e0b'
        ctx.fillRect(food.x, food.y, 10, 10)
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Score: ' + score, 8, 310);
    }

    function update() {
      if(!running) return;
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = {x: Math.floor(Math.random()*31)*10, y: Math.floor(Math.random()*31)*10, img: tokens[Math.floor(Math.random()*tokens.length)]};
      } else {
        snake.pop();
      }
      snake.unshift(head);

      if(head.x < 0 || head.y < 0 || head.x >= 320 || head.y >= 320) {
        running = false;
        onEnd(score);
      }
    }

    function keyDown(e) {
      if(e.key === 'ArrowUp') { dx = 0; dy = -10; }
      else if(e.key === 'ArrowDown') { dx = 0; dy = 10; }
      else if(e.key === 'ArrowLeft') { dx = -10; dy = 0; }
      else if(e.key === 'ArrowRight') { dx = 10; dy = 0; }
    }

    document.addEventListener('keydown', keyDown);
    const id = setInterval(()=>{ update(); draw(); }, 120);

    draw();
    return ()=>{ clearInterval(id); document.removeEventListener('keydown', keyDown); };
  }, [onEnd]);

  return <canvas ref={canvasRef} width={320} height={320} style={{borderRadius:8, display:'block', margin:'12px auto'}} />;
}
