
export default function handler(req, res) {
  const clientId = process.env.FARCASTER_CLIENT_ID || ''
  const redirectUri = process.env.FARCASTER_REDIRECT_URI || (process.env.NEXT_PUBLIC_SITE_URL || '') + '/api/auth/callback'
  const state = Math.random().toString(36).substring(2,15)
  const scope = 'profile' // placeholder
  const authUrl = `https://auth.farcaster.example/authorize?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`
  res.redirect(authUrl)
}
