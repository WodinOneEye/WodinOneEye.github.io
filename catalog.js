/* BooRadly — single source of truth for every project on the site.
   Used by portal.js (home + category views) and collection.js (collection pages).

   art.motif -> a procedural artwork recipe defined in portal.css
   art.hue   -> base hue (0-360) fed to that recipe, so one motif renders many ways
   art.image -> optional real screenshot; when present it replaces the procedural art */

const COLLECTIONS = [
  {
    slug: "mini-games", group: "games", page: "Mini-Games.html",
    name: "Mini Games", short: "Arcade",
    tagline: "Quick runs, classic challenges, and small worlds made for jumping straight in.",
    hue: 22
  },
  {
    slug: "music-quizzes", group: "games", page: "Music-Quizes.html",
    name: "Music Quizzes", short: "Quizzes",
    tagline: "Test your ears across the decades — sixties classics, yacht rock, country, EDM, and Miku.",
    hue: 285
  },
  {
    slug: "childrens-games", group: "games", page: "Children-Games.html",
    name: "Children's Games", short: "Kids",
    tagline: "Bright, friendly learning games and illustrated stories for curious younger players.",
    hue: 45
  }
];

const PROJECTS = [
  /* ---------- Mini Games ---------- */
  { slug: "rocketboost", title: "RocketBoost", collection: "mini-games",
    type: "Arcade", tech: "Unity / WebGL", href: "rocketboost/boost.html",
    blurb: "Thread a thrust-powered rocket through tight caverns without turning it into scrap.",
    art: { motif: "space", hue: 24 }, featured: true, tags: ["Arcade", "Physics"] },

  { slug: "mascara-blob", title: "Mascara Blob", collection: "mini-games",
    type: "Action", tech: "Unity / WebGL", href: "blob/index.html",
    blurb: "A squishy little action game about being a blob with somewhere to be.",
    art: { motif: "blob", hue: 305 }, tags: ["Action"] },

  { slug: "memory-hong-kong", title: "Memory Hong Kong", collection: "mini-games",
    type: "Puzzle", tech: "Unity / WebGL", href: "memory/memory.html",
    blurb: "Match the pairs, keep the streak, and see how much of the city you can hold in your head.",
    art: { motif: "tiles", hue: 194 }, tags: ["Memory", "Puzzle"] },

  { slug: "desert-command", title: "Desert Command", collection: "mini-games",
    type: "Defense", tech: "Browser / Arcade", href: "misslecommand/index.html",
    blurb: "Missile Command, reimagined. Intercept everything falling toward your cities.",
    art: { motif: "arc", hue: 12 }, featured: true, tags: ["Arcade", "Defense"] },

  { slug: "dragon-snake", title: "Dragon Snake", collection: "mini-games",
    type: "Classic", tech: "Browser / Arcade", href: "dragonsnake1/index.html",
    blurb: "The snake you know, grown into something with scales and a temper.",
    art: { motif: "arc", hue: 138 }, tags: ["Classic"] },

  { slug: "2048", title: "2048", collection: "mini-games",
    type: "Puzzle", tech: "Browser / Numbers", href: "2048/index.html",
    blurb: "Slide, merge, repeat. The number puzzle that refuses to let you stop at one more go.",
    art: { motif: "tiles", hue: 38 }, tags: ["Puzzle", "Numbers"] },

  { slug: "asteroids", title: "Asteroids", collection: "mini-games",
    type: "Arcade", tech: "Browser / Space", href: "asteroids/index.html",
    blurb: "Drifting rocks, wrapping screen edges, and a ship with no brakes worth mentioning.",
    art: { motif: "space", hue: 218 }, tags: ["Arcade", "Space"] },

  { slug: "galaxy-shooter", title: "Galaxy Shooter", collection: "mini-games",
    type: "Action", tech: "Unity / WebGL", href: "galaxyshooter/index.html",
    blurb: "Waves of enemies, power-ups, and the steady climb toward a score worth bragging about.",
    art: { motif: "space", hue: 268 }, featured: true, tags: ["Action", "Space"] },

  { slug: "terminal-hacker", title: "Terminal Hacker", collection: "mini-games",
    type: "Puzzle", tech: "Unity / Text", href: "termhacker/index.html",
    blurb: "Work your way up through increasingly ridiculous systems, one anagram at a time.",
    art: { motif: "terminal", hue: 146 }, tags: ["Words", "Puzzle"] },

  { slug: "topdown", title: "TopDown", collection: "mini-games",
    type: "Action", tech: "Unity / WebGL", href: "topdown/TopDown.html",
    blurb: "A top-down arena where your character aims wherever the cursor goes, with blocks scattered across the field.",
    art: { motif: "tiles", hue: 158 }, tags: ["Action", "Arena"] },

  /* ---------- Music Quizzes ---------- */
  { slug: "60s-quiz", title: "60s Music Quiz", collection: "music-quizzes",
    type: "Quiz", tech: "1960s / Classics", href: "60s/index.html",
    blurb: "British invasion, Motown, and surf rock. Name the track before the intro runs out.",
    art: { motif: "vinyl", hue: 18 }, tags: ["1960s"] },

  { slug: "60s-quiz-2", title: "60s Music Quiz #2", collection: "music-quizzes",
    type: "Quiz", tech: "1960s / Classics", href: "60s_quiz2/index.html",
    blurb: "A second round of the sixties for anyone who cleared the first one too easily.",
    art: { motif: "vinyl", hue: 342 }, tags: ["1960s"] },

  { slug: "70s-quiz", title: "70s Music Quiz", collection: "music-quizzes",
    type: "Quiz", tech: "1970s / Rock", href: "70s/index.html",
    blurb: "Arena rock, funk, and everything the seventies did at full volume.",
    art: { motif: "vinyl", hue: 288 }, tags: ["1970s"] },

  { slug: "yacht-rock", title: "Yacht Rock", collection: "music-quizzes",
    type: "Quiz", tech: "1970s / Soft Rock", href: "yrquiz/index.html",
    blurb: "Smooth basslines and immaculate production. Somehow the hardest quiz here.",
    art: { motif: "vinyl", hue: 196 }, tags: ["1970s", "Soft Rock"] },

  { slug: "80s-quiz", title: "80s Music Quiz", collection: "music-quizzes",
    type: "Quiz", tech: "1980s / New Wave", href: "80s_quiz/index.html",
    blurb: "Synths, drum machines, and reverb on absolutely everything.",
    art: { motif: "vinyl", hue: 318 }, tags: ["1980s"] },

  { slug: "griffers-80s", title: "Griffer's 80s Quiz", collection: "music-quizzes",
    type: "Quiz", tech: "1980s / Mix", href: "griffers_game/index.html",
    blurb: "A hand-picked eighties set with a few deep cuts to keep you honest.",
    art: { motif: "vinyl", hue: 258 }, tags: ["1980s"] },

  { slug: "90s-edm", title: "90s EDM", collection: "music-quizzes",
    type: "Quiz", tech: "1990s / Dance", href: "90sedm/index.html",
    blurb: "Big beat, house, and trance from when the drop was still being invented.",
    art: { motif: "vinyl", hue: 166 }, tags: ["1990s", "Dance"] },

  { slug: "country-quiz", title: "Country Music", collection: "music-quizzes",
    type: "Quiz", tech: "Country / Mix", href: "country/index.html",
    blurb: "Outlaw country through to modern Nashville, all in one run.",
    art: { motif: "vinyl", hue: 34 }, tags: ["Country"] },

  { slug: "miku", title: "Miku", collection: "music-quizzes",
    type: "Quiz", tech: "Vocaloid / Pop", href: "miku/index.html",
    blurb: "A full-motion Vocaloid quiz — the loudest, brightest thing in the library.",
    art: { motif: "vinyl", hue: 176 }, featured: true, tags: ["Vocaloid", "Video"] },

  /* ---------- Children's Games ---------- */
  { slug: "counting", title: "Counting Game", collection: "childrens-games",
    type: "Learning", tech: "Numbers / English", href: "counting/index.html",
    blurb: "Friendly first numbers practice with plenty of encouragement built in.",
    art: { motif: "kids", hue: 44 }, tags: ["Numbers"] },

  { slug: "mandarin-counting", title: "Counting in Mandarin", collection: "childrens-games",
    type: "Learning", tech: "Numbers / Mandarin", href: "mandarin/index.html",
    blurb: "The same gentle counting practice, this time in Mandarin.",
    art: { motif: "kids", hue: 4 }, tags: ["Numbers", "Mandarin"] },

  { slug: "numbers", title: "Numbers", collection: "childrens-games",
    type: "Learning", tech: "Ren'Py / Numbers", href: "mollys_game/index.html",
    blurb: "A narrated count from one to ten, illustrated the whole way with fluffy cats, flying kittens, and fleecy sheep.",
    art: { motif: "kids", hue: 268 }, tags: ["Numbers", "Counting"] },

  { slug: "abcs", title: "ABCs Game", collection: "childrens-games",
    type: "Learning", tech: "Letters / Words", href: "abc/ABC.html",
    blurb: "Letters, sounds, and first words for players just getting started.",
    art: { motif: "kids", hue: 202 }, tags: ["Letters"] },

  { slug: "scarlett-and-gage", title: "Scarlett & Gage", collection: "childrens-games",
    type: "Story", tech: "Interactive / Adventure", href: "theadventuresofscarlettandgage/SG.html",
    blurb: "An illustrated choose-your-path adventure for two small heroes.",
    art: { motif: "kids", hue: 330 }, featured: true, tags: ["Story", "Adventure"] },

  { slug: "wang-family", title: "Wang Family", collection: "childrens-games",
    type: "Story", tech: "Ren'Py / Adventure", href: "wangfamily/WangFamily-web/index.html",
    blurb: "An illustrated family trip through Chicago, Hong Kong, Fuxin, New Orleans, Osaka, and Disneyland, with a map and something to eat at every stop.",
    art: { motif: "kids", hue: 105 }, tags: ["Story", "Travel"] }
];

/* ---------- helpers shared by every page ---------- */

const byCollection = slug => PROJECTS.filter(p => p.collection === slug);
const collectionBySlug = slug => COLLECTIONS.find(c => c.slug === slug);
const isExternal = href => /^https?:\/\//.test(href);

/* Featured projects drive the hero carousel, in catalog order. */
const featuredProjects = () => PROJECTS.filter(p => p.featured);

/* Escapes text before it goes into innerHTML. */
const esc = value => String(value).replace(/[&<>"]/g, ch =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

/* Procedural artwork. Real screenshots drop straight in via art.image. */
function artMarkup(project, extraClass = "") {
  const { motif, hue, image } = project.art;
  if (image) {
    return `<div class="art ${extraClass}"><img src="${esc(image)}" alt="" loading="lazy" decoding="async"></div>`;
  }
  return `<div class="art art--${motif} ${extraClass}" style="--h:${hue}" aria-hidden="true">` +
    `<span class="art__ghost">${esc(project.title)}</span><i></i><i></i><i></i></div>`;
}

/* External links open in a new tab. */
function linkAttrs(project) {
  return isExternal(project.href) ? ' target="_blank" rel="noopener"' : "";
}

function ctaFor(project) {
  return project.cta || "Play now";
}

/* The card used by every rail and grid on the site. */
function cardMarkup(project) {
  return `<a class="card" href="${esc(project.href)}"${linkAttrs(project)}>
      <div class="card__media">
        <span class="card__tag">${esc(project.type)}</span>
        ${artMarkup(project)}
      </div>
      <div class="card__body">
        <h3 class="card__title">${esc(project.title)}</h3>
        <p class="card__blurb">${esc(project.blurb)}</p>
        <div class="card__foot">
          <span>${esc(project.tech)}</span>
          <span class="card__cta">${esc(ctaFor(project))} <b>&rarr;</b></span>
        </div>
      </div>
    </a>`;
}
