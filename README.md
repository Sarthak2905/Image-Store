# ImageStore — Premium Pre-Wedding Photography Website

A complete, modern, and fully responsive pre-wedding photography website built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools — just clean, production-ready code.

---

## ✨ Features

- **Animated Hero** — CSS gradient animation simulating a video background; drop-in `hero.mp4` support
- **Portfolio Grid** — Masonry-style 12-card grid with tab filtering (All / Pre-Wedding / Wedding / Cinematic) and a full-screen lightbox (keyboard-navigable)
- **Featured Albums** — 6 album cards linking to `album.html?id=N` with unique gradient palettes
- **Packages Section** — 3 glassmorphism pricing cards (Basic / Premium / Luxury) with an **AI Package Suggester** (range slider → rule-based JS recommendation)
- **Why Choose Us** — 4 feature cards with hover effects
- **Testimonials Carousel** — 5 slides, auto-advances every 4 s, dot indicators, manual nav
- **Instagram Feed Mock** — 3×3 grid with hover overlays; easy to replace with a real embed
- **Booking Form** — Full inline validation, phone/email checks, 1.5 s mock submit with gold success state
- **About Section** — Photographer story + stats counters animated via `requestAnimationFrame`
- **Footer** — 4-column layout, social icons, Google Maps embed, PDF download
- **Floating Buttons** — WhatsApp bounce animation, back-to-top
- **Album Detail Page** (`album.html`) — Reads `?id=` from URL; hero, gallery (8 photos), BTS (4 photos), CTA

---

## 🗂 Project Structure

```
Image-Store/
├── index.html              ← Main single-page site
├── album.html              ← Album detail page (reads ?id= from URL)
├── css/
│   └── styles.css          ← Complete stylesheet (~1 500 lines)
├── js/
│   └── main.js             ← Complete JavaScript (~380 lines)
├── assets/
│   ├── images/
│   │   └── placeholder.svg ← SVG gradient placeholder
│   ├── videos/
│   │   └── README.txt      ← Instructions for adding hero.mp4
│   └── pdf/
│       └── sample-album.pdf← Downloadable sample album PDF
└── README.md
```

---

## 🚀 Running Locally

No build step required.

```bash
# Option 1 — Python (built-in)
cd /path/to/Image-Store
python3 -m http.server 8080
# Open http://localhost:8080

# Option 2 — Node.js (npx)
npx serve .
# Open the URL shown in the terminal

# Option 3 — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

> **Important:** Always serve via a local HTTP server (not `file://`) so the Google Maps iframe and font CDN load correctly.

---

## 🎬 Replacing the Hero Video

1. Obtain a romantic pre-wedding MP4 clip (H.264, Full HD, 15–30 s, < 15 MB).
2. Compress with HandBrake or `ffmpeg -i input.mp4 -vcodec h264 -b:v 1M output.mp4`.
3. Rename to `hero.mp4` and place in `assets/videos/`.
4. The `<video>` element in `index.html` will pick it up automatically.

See `assets/videos/README.txt` for full details.

---

## 📸 Replacing Placeholder Images

All image placeholders are CSS `linear-gradient` backgrounds applied to `<div>` elements. To swap in real photos:

1. Add your image to `assets/images/`.
2. In `index.html` or `album.html`, replace the gradient `<div>` with an `<img>` tag:
   ```html
   <!-- Before -->
   <div class="card-bg card-bg-1"></div>
   
   <!-- After -->
   <img src="assets/images/your-photo.jpg" alt="Couple at Udaipur" loading="lazy" />
   ```
3. In `css/styles.css`, add `object-fit: cover; width: 100%; height: 100%;` to the image.

---

## 📱 Instagram Integration

The mock 3×3 grid in `#instagram` can be replaced with a real feed:

### Option A — EmbedSocial (easiest, no API key needed)
```html
<!-- Replace .instagram-grid div with: -->
<div class="embedsocial-hashtag" data-ref="YOUR_REF_ID"></div>
<script>(function(d, s, id){...})(document, 'script', 'EmbedSocialHashtagScript');</script>
```

### Option B — Curator.io
1. Sign up at [curator.io](https://curator.io).
2. Connect your Instagram account.
3. Copy the embed snippet and replace `.instagram-grid`.

### Option C — Instagram Basic Display API (DIY)
1. Create a Facebook Developer App at [developers.facebook.com](https://developers.facebook.com).
2. Add the Instagram Basic Display product.
3. Fetch `https://graph.instagram.com/me/media?fields=id,media_type,thumbnail_url,media_url&access_token=TOKEN`.
4. Dynamically render images in `js/main.js`.

---

## 📬 Booking Form Backend Options

The form currently shows a 1.5 s mock submit. To wire it to a real backend:

### Option A — Formspree (no-code, free tier)
```html
<form id="booking-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Remove the `e.preventDefault()` / mock submit block in `js/main.js`.

### Option B — EmailJS (client-side email)
```javascript
// In js/main.js, replace the setTimeout mock with:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  name:  document.getElementById('name').value,
  email: document.getElementById('email').value,
  phone: document.getElementById('phone').value,
  message: document.getElementById('message').value
});
```
Add `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>` to `index.html`.

### Option C — Custom Backend (Node / PHP / Python)
```javascript
// Replace the mock with:
fetch('/api/enquiry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, phone, message })
})
.then(res => res.json())
.then(() => { /* show success */ });
```

---

## 🤖 AI Package Suggester

The suggester in `#packages` uses a simple rule-based approach:

| Budget | Recommendation |
|--------|---------------|
| < ₹25,000 | Basic Package |
| ₹25,000 – ₹50,000 | Premium Package |
| > ₹50,000 | Luxury Package |

To upgrade to a real ML model, swap the `suggest()` function in `js/main.js` with a call to your preferred AI API (e.g., OpenAI, Gemini, or a custom model hosted on HuggingFace).

---

## 🎨 Customisation Tips

| What to change | Where |
|---|---|
| Brand colours | `--gold`, `--bg` etc. in `:root` in `css/styles.css` |
| Photographer name & bio | `#about` section in `index.html` |
| Package prices | `#packages` section in `index.html` |
| Contact details | `#booking` info + footer in `index.html` |
| Album data | `albums` array in `js/main.js` |
| WhatsApp number | `href` on `#whatsapp-btn` in both HTML files |
| Google Maps location | `src` on the `<iframe>` in the footer |
| Instagram handle | Links and heading in `#instagram` |

---

## 🌐 Deployment

The site is a static project — deploy to any static host:

- **GitHub Pages** — push to `gh-pages` branch or enable Pages in repo settings
- **Netlify** — drag-and-drop the folder at [app.netlify.com](https://app.netlify.com)
- **Vercel** — `vercel deploy` from the project root
- **Cloudflare Pages** — connect the repo in the Cloudflare dashboard

---

## 📄 License

MIT — free to use for personal and commercial projects. Attribution appreciated but not required.

---

*Built with ❤️ by the ImageStore team.*
