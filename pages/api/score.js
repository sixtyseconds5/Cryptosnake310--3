
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { fid, username, score } = req.body || {}
    if (!fid || typeof score !== 'number') return res.status(400).json({ error: 'Invalid payload' })

    const { data: rpcData } = await supabase.rpc('rpc_count_scores_today', { p_fid: fid }).catch(()=>({data:null}))
    let playsToday = 0
    if(rpcData && Array.isArray(rpcData) && rpcData[0] && rpcData[0].count !== undefined) {
      playsToday = Number(rpcData[0].count)
    } else {
      const { count } = await supabase.from('scores').select('*', { count: 'exact' }).eq('fid', fid).gte('created_at', new Date().toISOString().slice(0,10)+'T00:00:00Z')
      playsToday = Number(count) || 0
    }
    if (playsToday >= 5) return res.status(429).json({ error: 'Daily play limit reached (5 per day)' })

    const { data, error } = await supabase.from('scores').insert([{ fid, username, score }]).select()
    if (error) throw error
    return res.status(200).json({ ok: true, inserted: data })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}
