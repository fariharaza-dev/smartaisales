# SmartAi Sales on Vercel

This package contains the complete static site, page assets, and Vercel routing settings.

## Deploy

1. Extract this ZIP.
2. Open a terminal in the extracted `SmartAi-Sales-Vercel` folder.
3. Run `npx vercel --prod` and follow the prompts to sign in and select your Vercel account.
4. If Vercel asks for a framework or output directory, choose **Other** and **public**.

The site has no build step. Its HTML pages are in `public/`; `cleanUrls` keeps routes such as `/about`, `/blog`, and `/contact` working.

## Contact form

The current site stores contact submissions through its original Cloudflare D1 backend. That database cannot be included in a static Vercel ZIP. `api/contact.js` returns a clear setup message until you connect a Vercel compatible storage or email provider. The rest of the site is ready to deploy.
