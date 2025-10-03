
import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(()=>{
    fetch('/api/leaderboard').then(r=>r.json()).then(setLeaders).catch(()=>{});
  },[]);

  return (
    <div>
      <h3 className="text-lg font-semibold">🏆 Top 20 Leaderboard (This week)</h3>
      <ol className="mt-2 space-y-1">
        {leaders.length === 0 && <li className="text-sm text-gray-500">No scores yet.</li>}
        {leaders.map((p,i)=>(
          <li key={p.fid} className="text-sm flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 mr-2 flex items-center justify-center text-xs">{String(p.username||'U').charAt(0)}</div>
            <div>{i+1}. {p.username} — <strong>{p.score}</strong> pts</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
