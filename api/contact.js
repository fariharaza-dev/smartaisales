module.exports = function contactHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  return res.status(503).json({ error: 'The contact form backend is not configured for this Vercel deployment. Your information has not been sent.' });
};
