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
        sourceClipSeconds: 8,

        // ---- form fields: entirely independent per design ----
        fields: {
          photo: true,
          name: true,
          quote: false
        },

        // ---- positioning, verified via dev-tools/position-tester-live.html ----
        photoPosition: {
          top: "11%",
          left: "50%",
          width: "60.2%",
          borderRadius: "50%"
        },
        namePosition: {
          top: "47.5%"
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


      ,{
        id: "birthday-2",
        name: "Cake & Candles",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday2.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday2.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Cake & Candles theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-3",
        name: "Golden Birthday Glow",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday3.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday3.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Golden Birthday Glow theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-4",
        name: "Rainbow Balloon Pop",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday4.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday4.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Rainbow Balloon Pop theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-5",
        name: "Starlit Birthday Wish",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday5.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday5.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Starlit Birthday Wish theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-6",
        name: "Sparkle & Cake",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday6.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday6.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Sparkle & Cake theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-7",
        name: "Neon Party Nights",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday7.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday7.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Neon Party Nights theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-8",
        name: "Vintage Birthday Frame",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday8.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday8.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Vintage Birthday Frame theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-9",
        name: "Floral Birthday Bloom",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday9.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday9.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Floral Birthday Bloom theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-10",
        name: "Cosmic Birthday Countdown",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday10.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday10.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Cosmic Birthday Countdown theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-11",
        name: "Retro Birthday Disco",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday11.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday11.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Retro Birthday Disco theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
      ,{
        id: "birthday-12",
        name: "Pastel Balloon Dreams",
        // ⚠️ reusing birthday-1's background video for now — replace with a
        // unique bg_birthday12.mp4 later if you want a different animated background
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        previewVideo: "assets/previews/preview_birthday12.mp4", // ⬅️ ADD THIS FILE
        videoDurationSeconds: 18,
        sourceClipSeconds: 4.7,

        fields: { photo: true, name: true, quote: false },

        photoPosition: { top: "24.5%", left: "50%", width: "62.5%", borderRadius: "50%" },
        namePosition: { top: "58%" },

        music: [
          { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
          { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
          { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
          { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
        ],

        article: {
          title: "How to make a birthday video wish with the Pastel Balloon Dreams theme",
          body: `This theme pairs a birthday-themed background with your photo and name —
add a clear photo, type the name you're wishing, and pick one of the background tracks.
Your video renders in under a minute, ready to share on WhatsApp Status.`
        }
      }
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
so your sibling's photo is the first thi
