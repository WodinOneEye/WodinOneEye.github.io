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
    art: { motif: "tiles", hue: 194 }, tags: ["Memory", "Puzzle"],
    credit: { name: "Z.W. Gu", url: "https://www.artstation.com/guweiz", what: "Title art" } },

  { slug: "desert-command", title: "Desert Command", collection: "mini-games",
    type: "Defense", tech: "Browser / Arcade", href: "misslecommand/index.html",
    blurb: "Missile Command, reimagined. Intercept everything falling toward your cities.",
    art: { motif: "arc", hue: 12 }, featured: true, tags: ["Arcade", "Defense"] },

  { slug: "qix-reveal", title: "Qix Reveal", collection: "mini-games",
    type: "Arcade", tech: "Unity / WebGL", href: "qix-reveal/index.html",
    blurb: "Claim the dark and the painting underneath comes up with it. Cut fast for ground, slow for double points, and never stop mid-line — the fuse is watching.",
    credit: { name: "GUWEIZ", url: "https://www.artstation.com/guweiz", what: "Artwork" },
    art: { motif: "tiles", hue: 248 }, featured: true, tags: ["Arcade", "Classic", "Art"] },

  { slug: "desert-command-ai", title: "Desert Command AI", collection: "mini-games",
    type: "Defense", tech: "Unity / WebGL", href: "desert-command-ai/index.html",
    blurb: "The same skyline, but the enemy is studying you. It tracks where you aim, how high you detonate and what you waste, then buys whatever beats that habit.",
    art: { motif: "arc", hue: 212 }, featured: true, tags: ["Arcade", "Defense", "AI"] },

  { slug: "dragon-snake", title: "Dragon Snake", collection: "mini-games",
    type: "Classic", tech: "Browser / Arcade", href: "dragonsnake1/index.html",
    blurb: "The snake you know, grown into something with scales and a temper.",
    art: { motif: "arc", hue: 138 }, tags: ["Classic"] },

  { slug: "2048", title: "2048", collection: "mini-games",
    type: "Puzzle", tech: "Browser / Numbers", href: "2048/index.html",
    blurb: "Slide, merge, repeat. The number puzzle that refuses to let you stop at one more go.",
    art: { motif: "tiles", hue: 38 }, tags: ["Puzzle", "Numbers"] },

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

/* Artwork credit. Cards and hero slides are themselves links, and an anchor
   cannot be nested inside another, so this renders as plain text; the linked
   version of the same credit lives in the site footer. */
function creditLine(project) {
  if (!project.credit) return "";
  const { what, name } = project.credit;
  return `<p class="card__credit">${esc(what || "Art")} by ${esc(name)}</p>`;
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
        ${creditLine(project)}
        <div class="card__foot">
          <span>${esc(project.tech)}</span>
          <span class="card__cta">${esc(ctaFor(project))} <b>&rarr;</b></span>
        </div>
      </div>
    </a>`;
}
