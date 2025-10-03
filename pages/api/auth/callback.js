
import fetch from 'node-fetch'

export default async function handler(req, res) {
  const { code } = req.query
  if(!code) return res.status(400).send('Missing code')

  const tokenUrl = process.env.FARCASTER_TOKEN_URL || 'https://auth.farcaster.example/token'
  const clientId = process.env.FARCASTER_CLIENT_ID || ''
  const clientSecret = process.env.FARCASTER_CLIENT_SECRET || ''
  const redirectUri = process.env.FARCASTER_REDIRECT_URI || (process.env.NEXT_PUBLIC_SITE_URL || '') + '/api/auth/callback'

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    })
    const tokenRes = await fetch(tokenUrl, { method: 'POST', body, headers: { 'Content-Type':'application/x-www-form-urlencoded' } })
    const tokenJson = await tokenRes.json()
    const userInfo = { fid: tokenJson.fid || 'farcaster-user', username: tokenJson.username || 'FarcasterUser' }
    res.setHeader('Set-Cookie', `session=${encodeURIComponent(JSON.stringify(userInfo))}; HttpOnly; Path=/; Max-Age=${60*60*24}`)
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.status(500).send('OAuth error: ' + (err.message || err))
  }
}
