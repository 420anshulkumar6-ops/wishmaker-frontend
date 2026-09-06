// Shared blog data — used by index.html (homepage preview), articles.html
// (full list) and article.html (detail page). Each item needs a unique id.
// Replace title/desc/body with real content later — id, emoji, time can stay.

window.ARTICLES = [
  { id: 1, emoji: "🎬", title: "How to Make a WhatsApp Status Video Wish in 30 Seconds", desc: "A simple step-by-step guide to creating a personalised video wish with your photo and music, and sharing it on WhatsApp Status so everyone sees it.", time: "4 min read" },
  { id: 2, emoji: "🪢", title: "15 Heartfelt Raksha Bandhan Wish Ideas for Your Brother or Sister", desc: "Stuck on what to write this Rakhi? Here are warm, funny and emotional Raksha Bandhan wish ideas you can use in your video wish, message or WhatsApp Status.", time: "5 min read" },
  { id: 3, emoji: "🎂", title: "How to Write a Birthday Wish They'll Actually Remember", desc: "Move beyond \"Happy Birthday, have a great year\". Practical tips and ready-to-use lines for birthday wishes that feel personal — plus how to turn one into a video wish.", time: "4 min read" },
  { id: 4, emoji: "🪔", title: "Diwali Wishes and Message Ideas for Family, Friends and WhatsApp", desc: "A collection of warm Diwali wishes — traditional, modern and short Status-ready lines — plus tips for sending a festival greeting that stands out this year.", time: "4 min read" },
  { id: 5, emoji: "💍", title: "How to Write a Heartfelt Anniversary Message for Your Partner", desc: "From sweet one-liners to longer, emotional notes — ideas to help you say exactly what another year together means.", time: "3 min read" },
  { id: 6, emoji: "🇮🇳", title: "Independence Day Wishes: Patriotic Messages to Share on WhatsApp", desc: "Short, proud, and shareable Independence Day lines — perfect for a WhatsApp Status or a quick video wish.", time: "3 min read" },
  { id: 7, emoji: "🎨", title: "Holi Wishes and Colourful Status Ideas for Friends and Family", desc: "Playful, colourful messages to send this Holi — plus a few tips for a video wish that pops as much as the festival itself.", time: "3 min read" },
  { id: 8, emoji: "🎉", title: "New Year Wishes: Fresh Quotes to Ring in the New Year", desc: "Warm and hopeful lines for ringing in the New Year with the people who matter — for messages, cards or a midnight video wish.", time: "4 min read" },
  { id: 9, emoji: "💐", title: "Wedding Wishes and Toasts for the Newly Married Couple", desc: "Sweet and simple lines to congratulate a couple just starting their journey together — perfect for a card or a wedding video wish.", time: "4 min read" },
  { id: 10, emoji: "🎥", title: "5 Tips to Make Your WhatsApp Status Video Wish Stand Out", desc: "Simple photo, music and timing choices that make the difference between a forgettable wish and one people actually rewatch.", time: "3 min read" },

  { id: 11, emoji: "🎵", title: "Best Songs to Pair with a Birthday Video Wish", desc: "A quick guide to picking background music that matches the mood — upbeat, emotional, or somewhere in between.", time: "3 min read" },
  { id: 12, emoji: "📸", title: "How to Choose the Perfect Photo for Your Video Wish", desc: "Lighting, framing and cropping tips so your photo looks great inside any card design.", time: "3 min read" },
  { id: 13, emoji: "🎁", title: "Raksha Bandhan Gift Ideas to Pair with Your Video Wish", desc: "Simple gift ideas to send alongside a Rakhi video wish, from thoughtful to fun.", time: "4 min read" },
  { id: 14, emoji: "🕯️", title: "Diwali Decoration Ideas to Inspire Your Video Background", desc: "Diya arrangements, rangoli patterns and light setups that make for a festive backdrop.", time: "3 min read" },
  { id: 15, emoji: "💌", title: "10 Anniversary Quotes for Every Year of Marriage", desc: "A quote for every milestone — first anniversary through to decades together.", time: "4 min read" },
  { id: 16, emoji: "🎆", title: "How to Plan a Surprise Independence Day Post for Your Group", desc: "Ideas for surprising your friends or family group with a patriotic video wish this August.", time: "3 min read" },
  { id: 17, emoji: "📱", title: "Holi Safety Tips: Protecting Your Phone While Celebrating", desc: "Simple precautions so you can capture the colours without damaging your phone.", time: "2 min read" },
  { id: 18, emoji: "📝", title: "New Year Resolutions to Share with Friends and Family", desc: "Fun and meaningful resolution ideas to include in your New Year video wish.", time: "3 min read" },
  { id: 19, emoji: "👰", title: "Wedding Planning Tips: What to Post on the Big Day", desc: "A short guide to sharing wedding-day moments online without the stress.", time: "4 min read" },
  { id: 20, emoji: "📈", title: "Why Video Wishes Are Replacing Text Messages in 2026", desc: "A look at why personalised video greetings are becoming the new normal for celebrations.", time: "3 min read" },

  { id: 21, emoji: "👵", title: "How to Make Your Grandparents' Birthday Extra Special", desc: "Thoughtful ways to involve the whole family in a birthday video wish for grandparents.", time: "3 min read" },
  { id: 22, emoji: "🧵", title: "Sibling Rivalry to Sibling Love: Rakhi Stories Worth Sharing", desc: "Heartwarming sibling stories to inspire this year's Raksha Bandhan message.", time: "4 min read" },
  { id: 23, emoji: "🪷", title: "The History and Meaning Behind Diwali", desc: "A short, simple explainer on the story and symbolism behind the festival of lights.", time: "5 min read" },
  { id: 24, emoji: "🌍", title: "Long-Distance Anniversary Ideas for Couples Apart", desc: "Ways to celebrate a special day together, even when you're miles apart.", time: "3 min read" },
  { id: 25, emoji: "🎖️", title: "Independence Day Trivia: Fun Facts to Share This August", desc: "Interesting facts to share with friends and family this Independence Day.", time: "3 min read" },
  { id: 26, emoji: "🍬", title: "Holi Recipes: Traditional Sweets to Pair with Your Celebration", desc: "A few classic sweet recipes that go perfectly with a colourful Holi celebration.", time: "4 min read" },
  { id: 27, emoji: "🎧", title: "New Year's Eve Party Playlist Ideas", desc: "Song ideas to keep the countdown energy going all night.", time: "3 min read" },
  { id: 28, emoji: "💒", title: "Wedding Anniversary vs Wedding Day: What's the Difference?", desc: "A light explainer on how each occasion is usually celebrated differently.", time: "2 min read" },
  { id: 29, emoji: "🎈", title: "How to Personalise a Video Wish for Kids' Birthdays", desc: "Fun, colourful ideas to make a child's birthday video wish extra special.", time: "3 min read" },
  { id: 30, emoji: "📲", title: "Top 5 WhatsApp Status Trends for Festive Season", desc: "What's trending on WhatsApp Status this festive season, and how to join in.", time: "3 min read" },
];

// Generates simple dummy body paragraphs for the detail page (article.html).
// Replace this with real written content per article when ready — you can
// just add a `body: "..."` field to any item above and article.html will
// use that instead of this generator.
window.getArticleBody = function (article) {
  if (article.body) return article.body;
  return `
    <p>${article.desc}</p>
    <p>This is placeholder content for "${article.title}". Use this space to
    write the full article — an introduction, a few practical tips, and a
    short example or two — the same way you would for any blog post.</p>
    <p>A good structure to follow: start with why this occasion or topic
    matters, give 3–5 concrete tips or ideas, and end with a line
    encouraging the reader to try creating their own WishMaker video wish
    for it.</p>
    <p>(This text is a placeholder generated automatically — replace it with
    your real article content in <code>js/articles-data.js</code> by adding
    a <code>body</code> field to this article's entry.)</p>
  `;
};
