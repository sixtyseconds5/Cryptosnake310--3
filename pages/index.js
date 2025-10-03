
import React, { useEffect, useState } from 'react';
import Game from '../src/Game';
import Leaderboard from '../src/Leaderboard';

export default function Home() {
  const [user, setUser] = useState(null);
  const [playsLeft, setPlaysLeft] = useState(5);
  const [playing, setPlaying] = useState(false);

  useEffect(()=>{
    fetch('/api/auth/user').then(r=>r.json()).then(data=>{ if(data?.fid) setUser(data); }).catch(()=>{})
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🐍 CryptoSnake</h1>
          {user ? (
            <div className="text-sm">Signed in as <strong>{user.username}</strong></div>
          ) : (
            <a href="/api/auth/login" className="px-3 py-1 rounded bg-emerald-500 text-white">Sign in with Farcaster</a>
          )}
        </div>

        <p className="mt-3 text-sm text-slate-600">Collect tokens, grow your snake, and climb the weekly leaderboard!</p>

        <div className="mt-6">
          <p>Hello <strong>{user?.username || 'Guest'}</strong>, plays left today: {playsLeft}/5</p>
          {playing ? (
            <Game onEnd={(score)=>{
              fetch('/api/score', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ fid: user?.fid || 'guest', username: user?.username || 'Guest', score })})
                .then(r=>r.json()).then(res=>{ if(res.error) alert(res.error); else { setPlaysLeft(p=>Math.max(0,p-1)); alert('Score submitted: '+score); } })
            }} />
          ) : playsLeft > 0 ? (
            <button onClick={()=>setPlaying(true)} className="mt-4 px-4 py-2 rounded bg-emerald-500 text-white">Start Playing</button>
          ) : (
            <p className="text-red-500 mt-4">You've used up all your plays for today!</p>
          )}
        </div>

        <div className="mt-6"><Leaderboard /></div>
      </div>
    </div>
  );
}
