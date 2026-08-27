# WishCraft — Complete Roadmap
*(Personalized video wish website — AdSense earning ke liye)*

---

## 1. Core Concept

- Website jahan user apne dost/family ka **naam + photo** daal kar ek **celebration video** banata hai
- Video **WhatsApp Status** pe share karne ke liye design ki gayi hai
- Monetization: **Google AdSense**
- Traffic strategy: **Instagram Reels** ("website pe jao, aise video banao" wala content)

---

## 2. Video Kaise Banti Hai (Design Process)

1. **Canva** se ek achha static/animated design banate ho (background, decorations, ek **empty circle/spot** photo ke liye)
2. **Google Flow** se us design ko animate karte ho (confetti girna, candles jalna, etc.)
3. Ye ban ke ek **short video clip** (jaise 4-7 sec) milta hai — isse project me `assets/videos/` folder me daalte hain
4. Website is clip ko **loop** karke lambi banati hai (18 sec target) aur **user ki photo + naam overlay** karti hai

### Important design rule (finalized):
- **Animation (confetti/sparkles) photo ke upar se nahi guzarni chahiye** — kyuki photo ek static flat layer hoti hai jo animation ko "dabaa" degi. Design banate waqt saara movement circle ke **bahar (sides/top/bottom)** rakhna hai.
- Future option (abhi nahi, baad me try karna): transparent alpha-channel wala **sparkle overlay video** upar se add karna, taaki photo ke upar bhi halka shimmer effect aaye bina usse dabaye. Ye premium look dega.

### Photo Position Measure Karne Ka Tareeka:
- Har naye design/video ke liye photo ka exact position (top %, left %, width %) manually nikalna padega
- Iske liye ek **Visual Position Adjuster tool** bana hai (`dev-tools/position-adjuster.html`) — video/image load karo, box ko drag-resize karke circle pe fit karo, exact percentage values copy karo
- Ye values `category-config.js` me us design ke `photoPosition` field me jaati hain

---

## 3. Video Length & Looping (Finalized)

- Original Canva/Flow clip chhota hota hai (~4-7 sec)
- FFmpeg se `-stream_loop` karke ise **~18 second** tak loop karte hain
- **Crossfade transition ki zaroorat nahi** — agar confetti/animation clip me dense hai, to loop-seam (jump) visible nahi hota (test karke confirm kiya gaya)
- **Video ka apna original audio MUTE rahega.** Sirf user-selected music (background music) poori 18 sec continuous chalegi — dono audio tracks clash nahi karenge

---

## 4. Website Architecture (Finalized)

### Pages (sirf 3, dynamic):
- `index.html` — Homepage: categories dikhti hain (Birthday, Anniversary, Diwali, etc.) card-stack design me
- `create.html?theme=<category>` — Ek hi file, sabhi categories ke liye. URL parameter se pata chalta hai kaunsi category hai
- `wish.html?id=<uniqueId>` — Ek hi file, generated video dikhata hai, download/share buttons

### Ek category ke andar multiple designs:
- Jaise "Birthday" category ke andar 4-5 alag-alag background designs ho sakte hain
- `category-config.js` me har category ke andar `designs[]` array hai — naya design add karna matlab sirf ek naya object is array me daalna
- Agar category me 2+ designs hain, to `create.html` automatically ek "Choose a design" option dikhata hai

### Master Config File — `js/category-config.js`
Single source of truth. Isme har category ki:
- Label, title, subtitle
- Naam field chahiye ya nahi (`showNameField`)
- Music list (category-level shared, per-design override bhi possible)
- Designs array — har design ka background video path, photo position, video duration

**Naya category add karne ka process** (future — Diwali, Gurunanak Jayanti, etc.):
1. `category-config.js` me naya category-key add karo (existing wale ko copy-paste karke edit karo)
2. Naye backgrounds `assets/videos/` me daalo
3. Position-adjuster tool se photo-position nikalo
4. `index.html` pe ek naya card add karo jo `create.html?theme=<naya-key>` pe le jaye

Isse `create.html` aur `wish.html` **kabhi edit nahi karne padenge** naye content ke liye — sirf config file aur assets update honge.

---

## 5. Folder Structure (Finalized)

```
index.html
create.html
style.css
create.css
/js/
    category-config.js   (master config — sab categories/designs yahan)
    create.js             (form logic — theme padhna, UI banana)
    wish.js                (baad me banega — video display logic)
/assets/
    /videos/
        bg_birthday1.mp4
        bg_birthday2.mp4   (future)
        bg_diwali1.mp4     (future)
/music/
    birthday-1.mp3
    birthday-2.mp3
    birthday-3.mp3
    birthday-4.mp3
/dev-tools/
    position-adjuster.html  (sirf development ke liye, live site pe link nahi hoga)
privacy.html   (banana baaki)
contact.html   (banana baaki)
disclaimer.html (banana baaki)
```

---

## 6. Tech Stack & Cost (Finalized)

| Part | Service | Free/Paid |
|---|---|---|
| Frontend hosting | Netlify | Free (shuru me), baad me custom domain + paid hosting |
| Database (wish data, links) | Firebase Firestore | Free tier |
| Photo upload/hosting | ImgBB API | Free |
| Music files | GitHub repo (khud ke, royalty-free) | Free |
| Video processing (FFmpeg) | Render.com backend | Free tier pehle, **paid (~₹580/month) baad me speed ke liye** |
| Final video storage | Cloudflare R2 | Free tier (10GB), egress bandwidth bhi free |

### Video Speed — Fact (Finalized):
- **Free tier pe** 5-7 sec ka target possible nahi — server "sleep" hone ki wajah se pehli request 30-50 sec le sakti hai
- **Paid backend (~₹580/month)** se server hamesha "on" rahega, FFmpeg render time ~3-6 sec ho sakta hai — total wait ~5-8 sec, jo target ke kaafi kareeb hai
- **Decision:** Pehle **free tier pe pura system test** karenge (functionality check), jab sab kaam kar jaye aur design final ho, **tab paid backend pe switch** karenge speed ke liye

---

## 7. UI/Design Decisions (Finalized)

- **Dark theme**, warm palette — deep charcoal-plum background, gold + coral accents (generic purple-gradient AI-template jaisa nahi)
- Fonts: Fraunces (display/headings) + Inter (body text)
- Mobile-first (kyuki traffic mostly mobile se WhatsApp users)
- **Sidebar nahi** — mobile UX ke liye theek nahi. Iski jagah simple **footer links** (About, Contact, Privacy, Disclaimer) — ye AdSense ke liye bhi zaroori hain aur already `index.html` footer me add ho chuke hain
- Homepage pe **card-stack design** — occasion cards tilt kiye hue, real greeting cards jaisa feel

---

## 8. AdSense Compliance — Zaroori Facts (Finalized)

- Sirf footer links (About/Contact/Privacy/Disclaimer) kaafi nahi — **actual unique text content bhi chahiye** (jaise har category ke baare me kuch paragraphs), warna "thin content" maan ke reject ho sakta hai
- **Music copyright-free honi chahiye** (Pixabay Music, YouTube Audio Library jaisi sources se) — copyrighted gaane use kiye to AdSense ban ho sakta hai
- **Privacy Policy me photo-handling clearly likhna hoga** — kitne din user photo store hogi, kaise delete hogi, etc. (kyuki website user photos upload karati hai)
- In sab pages (`privacy.html`, `contact.html`, `disclaimer.html`) ko banana **baaki hai** — backend ke baad karenge

---

## 9. Development Order (Finalized Sequence)

1. ✅ **Frontend UI** — `index.html` (homepage) — **done**
2. ✅ **Frontend UI** — `create.html` (form: design-select, naam, photo, music) — **done**
3. ✅ **Background video test** — position measurement, loop test, audio-strategy decide — **done**
4. ✅ **Position Adjuster dev-tool** — reusable tool future designs ke liye — **done**
5. ✅ **Config restructure** — multi-design-per-category architecture — **done**
6. 🔜 **Firebase setup** — account banana, Firestore enable karna — **next step, abhi shuru karna hai**
7. 🔜 **ImgBB setup** — API key lena
8. 🔜 **Backend banana** — Render.com pe FFmpeg-based video processing service (Node.js/Python, poora AI se likhega)
9. 🔜 **Cloudflare R2 setup** — video storage
10. 🔜 **Poora pipeline connect karna** — form submit → photo upload → backend render → storage upload → Firestore save → wish.html link generate
11. 🔜 **wish.html banana** — video preview + download + WhatsApp share button
12. 🔜 **Testing + bug fixing** (free tier pe)
13. 🔜 **Privacy/Contact/Disclaimer pages banana**
14. 🔜 **Paid backend switch** (speed ke liye, jab sab test ho jaye)
15. 🔜 **Doosra design/category add karna** (Anniversary, Diwali, etc.)
16. 🔜 **Custom domain + paid hosting** (jab traffic real ho)
17. 🔜 **Instagram Reels se traffic** laana

---

## 10. External Accounts Needed (Abhi Karna Hai)

1. **Firebase** (console.firebase.google.com) — Firestore Database + Web app config
2. **ImgBB** (api.imgbb.com) — API key
3. **Render.com** (render.com) — GitHub se signup, backend hosting ke liye
4. **Cloudflare R2** (dash.cloudflare.com) — bucket + API token, video storage ke liye
5. **GitHub** (github.com) — code repository, Netlify/Render dono isse connect honge

**Security note (already discussed):** Testing ke liye keys chat me dena theek hai (jaisa tumne khud decide kiya), lekin production jaane se pehle sab keys **rotate/regenerate** karna zaroori hai.

---

## 11. Open/Future Items (Abhi Decide Nahi Hua, Baad Me Sochna Hai)

- wish.html ka exact UI/animation (photo preloader, "tap to open gift" jaisa interactive element — original prompt me tha, abhi tak detail discuss nahi hui)
- Video download mechanism ka exact implementation (backend se render hone ke baad file kaise serve hogi)
- WhatsApp direct-share ka exact tareeka (Web Share API use hoga, browser-support check karna hoga)
- Videos kitne din storage me rakhni hain (auto-cleanup policy) — cost control ke liye zaroori hai
- Unique ID generation ka tareeka (UUID jaisa, guessable nahi hona chahiye — privacy ke liye)
- Transparent sparkle-overlay wala premium design (Option B jo discuss hui) — kisi future design pe try karna
- **ImgBB key abhi frontend code me directly hai (testing ke liye theek hai) — production se pehle photo-upload ko backend se route karna hoga taaki key browser me kabhi visible na ho**

---

*Last updated: Is roadmap ko update karte rehna jab bhi koi naya decision liya jaye, taaki pura context ek hi jagah mile.*
