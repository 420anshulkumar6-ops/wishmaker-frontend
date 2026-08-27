// ===== theme-config.js =====
// Single source of truth for every category and every design inside it.
//
// Structure:
//   categorySettings.<categoryKey> = {
//     ...category-level info (label, name field, music list)...
//     designs: [ { id, name, backgroundVideo, photoPosition, videoDurationSeconds }, ... ]
//   }
//
// To add a NEW DESIGN to an existing category (e.g. a 2nd Birthday background):
//   1. Drop the new clip in /assets/videos/
//   2. Open dev-tools/position-adjuster.html, load that clip, drag the box
//      over its empty photo-spot, copy the generated snippet
//   3. Add a new object to that category's `designs` array below
//
// To add a NEW CATEGORY (e.g. Diwali):
//   1. Copy the `birthday` block below, rename the key
//   2. Add its own designs the same way
//   3. Add a matching card on index.html pointing to create.html?theme=<key>
// Nothing else in create.js / wish.js needs to change.

const categorySettings = {

  birthday: {
    label: "birthday wish",
    title: "Make it theirs",
    subtitle: "Add their name, a good photo, and a tune — we'll do the rest.",
    showNameField: true,

    // Shared music list for this category. If a specific design ever needs
    // its own tracks instead, add a `music` array on that design object —
    // create.js checks the design first, then falls back to this list.
    music: [
      { id: "m1", name: "Happy Chimes",     file: "music/birthday-1.mp3" },
      { id: "m2", name: "Party Bells",      file: "music/birthday-2.mp3" },
      { id: "m3", name: "Warm Wishes",      file: "music/birthday-3.mp3" },
      { id: "m4", name: "Soft Celebration", file: "music/birthday-4.mp3" }
    ],

    designs: [
      {
        id: "birthday-1",
        name: "Balloons & Confetti",
        backgroundVideo: "assets/videos/bg_birthday1.mp4",
        // Verified by actually rendering a test video through the backend
        // and visually checking the result — this was more reliable than
        // eyeballing a single frame or a differently-scaled test screenshot.
        photoPosition: {
          top: "27%",
          left: "50%",
          width: "40%",
          borderRadius: "50%"
        },
        sourceClipSeconds: 4.7,   // length of the raw Canva/Flow clip
        videoDurationSeconds: 18, // final rendered length after looping
        // Backend note: loop with `ffmpeg -stream_loop N -i bg_birthday1.mp4 -t 18 ...`,
        // strip the clip's own audio track, then mix in the user-selected music.
      }

      // Next design in this same category (example — not active yet):
      // {
      //   id: "birthday-2",
      //   name: "Cake & Candles",
      //   backgroundVideo: "assets/videos/bg_birthday2.mp4",
      //   photoPosition: { top: "..%", left: "..%", width: "..%", borderRadius: "50%" },
      //   sourceClipSeconds: 0,
      //   videoDurationSeconds: 18
      // }
    ]
  }

  // Next category (example — not active yet):
  // diwali: {
  //   label: "diwali wish",
  //   title: "...",
  //   subtitle: "...",
  //   showNameField: false,
  //   music: [ ... ],
  //   designs: [
  //     { id: "diwali-1", name: "...", backgroundVideo: "assets/videos/bg_diwali1.mp4",
  //       photoPosition: { top: "..%", left: "..%", width: "..%", borderRadius: "12px" },
  //       sourceClipSeconds: 0, videoDurationSeconds: 18 }
  //   ]
  // }

};

export { categorySettings };