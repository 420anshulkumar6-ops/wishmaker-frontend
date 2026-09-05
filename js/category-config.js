// ===== category-config.js =====
// Single source of truth for every category and every design inside it.
// Used by: index.html (category list), category.html (design list within
// a category), create.html (the form), and the position-tester dev tool.
//
// ARCHITECTURE:
//   categorySettings.<categoryKey> = {
//     label, icon, tagline          -> shown on the homepage category card
//     designs: [ {...}, {...} ]     -> each design is a fully independent unit
//   }
//
// Each design controls its OWN form fields — this is what lets one design
// ask for just a photo, while another asks for photo + name + a quote.
// Nothing is inherited from the category level for form-fields on purpose,
// so a new design can never accidentally show a field you didn't intend.
//
// TO ADD A NEW DESIGN to an existing category:
//   1. Drop the new background clip in /assets/videos/
//   2. Drop a short preview clip (or reuse the same file) in /assets/previews/
//   3. Open dev-tools/position-tester-live.html, pick this category+design
//      from the dropdowns once added, dial in photoPosition + namePosition
//   4. Add a new object to that category's `designs` array below
//   5. Add the same design (mirrored fields) to the backend's categoryConfig.js
//
// TO ADD A NEW CATEGORY (e.g. Diwali):
//   1. Copy the `birthday` block below, rename the key
//   2. Give it its own designs the same way as above
//   3. That's it — index.html reads this object and lists categories
//      automatically, including the (N) design-count badge.

const categorySettings = {

  birthday: {
    label: "Birthday Wish",
    icon: "🎂",
    tagline: "Confetti, candles, and their name in lights.",

    designs: [
      {
        id: "birthday-1",
        name: "Balloons & Confetti",
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday1.mp4", // short looping sample shown on the category page — you'll add this file
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        // ---- form fields: entirely independent per design ----
        fields: {
          photo: true,
          name: true,
          quote: false
        },

        // ---- positioning, verified via dev-tools/position-tester-live.html ----
        photoPosition: {
          top: "24.5%",
          left: "50%",
          width: "62.5%",
          borderRadius: "50%"
        },
        namePosition: {
          top: "58%"
        },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        // ---- AdSense-oriented content: shown as "How to use this design" ----
        article: {
          title: "How to make a birthday video wish with the Balloons & Confetti design",
          body: `This design pairs a bright, animated confetti-and-balloons background with
a circular photo frame, so the birthday person's face is the first thing anyone sees when
they tap open your WhatsApp Status. Start by choosing a clear, well-lit, front-facing photo —
close-up shots work best since the frame crops to a circle. Add their name exactly as you'd
like it to appear; it's placed just below the photo in a soft banner. Finally, pick one of the
four background tracks — each is a short instrumental loop chosen to feel celebratory without
being distracting. Once you tap "Create the video," it takes under a minute to render. You'll
get a shareable link and a download button, so you can post it straight to your Status or send
it directly as a video file.`
        }
      }

      // Next design in this same category (example — not active yet):
      // {
      //   id: "birthday-2",
      //   name: "Cake & Candles",
      //   backgroundVideo: "assets/videos/bg_birthday2.mp4",
      //   previewVideo: "assets/previews/preview_birthday2.mp4",
      //   videoDurationSeconds: 18,
      //   sourceClipSeconds: 0,
      //   fields: { photo: true, name: true, quote: false },
      //   photoPosition: { top: "..%", left: "..%", width: "..%", borderRadius: "50%" },
      //   namePosition: { top: "..%" },
      //   music: [ ... ],
      //   article: { title: "...", body: "..." }
      // }
    ]
  }

  ,rakhi: {
    label: "Raksha Bandhan",
    icon: "🪢",
    tagline: "The bond of a lifetime.",

    designs: [
      {
        id: "rakhi-1",
        name: "Threads of Love",
        backgroundVideo: "assets/videos/bg_rakhi1.mp4", // ⬅️ ADD THIS FILE
        previewVideo: "assets/previews/preview_rakhi1.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: false, quote: false },

        // ⚠️ placeholder position, copied from birthday — re-tune this in
        // dev-tools/position-tester-live.html once bg_rakhi1.mp4 is added
        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Behna O Behna",         file: "music/rakhi-1.mp3" }, // ⬅️ ADD
          { id: "m2", name: "Phoolon Ka Taaron Ka",  file: "music/rakhi-2.mp3" }  // ⬅️ ADD
        ],

        article: {
          title: "How to make a Raksha Bandhan video wish with the Threads of Love design",
          body: `This design pairs a warm rakhi-themed background with a circular photo frame,
so your sibling's photo is the first thing they see. Choose a clear photo — a childhood photo
of the two of you together often gets the biggest smile. Pick one of the background tracks and
render your video in under a minute, ready to share on WhatsApp Status.`
        }
      }
    ]
  }

  ,diwali: {
    label: "Diwali Wish",
    icon: "🪔",
    tagline: "Diyas, sparkles & sweets.",

    designs: [
      {
        id: "diwali-1",
        name: "Festival of Lights",
        backgroundVideo: "assets/videos/bg_diwali1.mp4", // ⬅️ ADD THIS FILE
        previewVideo: "assets/previews/preview_diwali1.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        // ⚠️ placeholder position, copied from birthday — re-tune this in
        // dev-tools/position-tester-live.html once bg_diwali1.mp4 is added
        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "24px" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Deepavali Aarti",     file: "music/diwali-1.mp3" }, // ⬅️ ADD
          { id: "m2", name: "Festival of Lights",  file: "music/diwali-2.mp3" }  // ⬅️ ADD
        ],

        article: {
          title: "How to make a Diwali video wish with the Festival of Lights design",
          body: `This design pairs a glowing diya-and-lights background with your photo and name,
perfect for greeting family and friends this Diwali. Add a bright, well-lit photo, type the name
you want to greet, and pick a festive track — your video renders in under a minute and is ready
to share on WhatsApp Status.`
        }
      }
    ]
  }

  ,anniversary: {
    label: "Anniversary",
    icon: "💍",
    tagline: "For the two of you.",

    designs: [
      {
        id: "anniversary-1",
        name: "Forever Yours",
        backgroundVideo: "assets/videos/bg_anniversary1.mp4", // ⬅️ ADD THIS FILE
        previewVideo: "assets/previews/preview_anniversary1.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        // ⚠️ placeholder position, copied from birthday — re-tune this in
        // dev-tools/position-tester-live.html once bg_anniversary1.mp4 is added
        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Forever Yours",  file: "music/anniversary-1.mp3" }, // ⬅️ ADD
          { id: "m2", name: "Slow Romance",   file: "music/anniversary-2.mp3" }  // ⬅️ ADD
        ],

        article: {
          title: "How to make an anniversary video wish with the Forever Yours design",
          body: `This design puts your couple photo and names front and centre against a warm,
romantic background — a lovely way to celebrate another year together. Add a favourite photo of
the two of you, your names, and a slow romantic track, and your video is ready to share in under
a minute.`
        }
      }
    ]
  }

};

export { categorySettings };
