/* BooRadly — home and category views.
   Requires catalog.js to be loaded first. */

(function () {
  const view = document.querySelector("#view");
  const searchInput = document.querySelector("#search-input");
  const HERO_INTERVAL = 7000;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let heroTimer = null;
  let heroIndex = 0;
  let heroWired = false;

  /* ---------- hero carousel ---------- */

  function heroMarkup(items) {
    const slides = items.map((project, i) => {
      const collection = collectionBySlug(project.collection);
      return `<a class="hero__slide${i === 0 ? " is-active" : ""}" data-slide="${i}"
                 href="${esc(project.href)}"${linkAttrs(project)}>
          ${artMarkup(project)}
          <div class="hero__scrim"></div>
          <div class="hero__body">
            <span class="hero__badge">Featured</span>
            <h2 class="hero__title">${esc(project.title)}</h2>
            <div class="hero__meta">
              <span class="accent">${esc(project.type)}</span><i class="dot"></i>
              <span>${esc(project.tech)}</span><i class="dot"></i>
              <span>${esc(collection ? collection.name : "")}</span>
            </div>
            <p class="hero__blurb">${esc(project.blurb)}</p>
            ${creditLine(project)}
            <div class="hero__actions">
              <span class="btn btn--primary">${esc(ctaFor(project))} &rarr;</span>
            </div>
          </div>
        </a>`;
    }).join("");

    const dots = items.map((project, i) =>
      `<button type="button" data-dot="${i}" class="${i === 0 ? "is-active" : ""}"
               aria-label="Show ${esc(project.title)}"></button>`).join("");

    const thumbs = items.slice(0, 4).map((project, i) =>
      `<button type="button" class="hero__thumb${i === 0 ? " is-active" : ""}" data-thumb="${i}">
          ${artMarkup(project)}<span>${esc(project.title)}</span>
        </button>`).join("");

    return `<section class="hero" aria-label="Featured projects">
        <div class="hero__stage" id="hero-stage">
          ${slides}
          <button type="button" class="hero__nav hero__nav--prev" data-hero="prev" aria-label="Previous featured project">&#8249;</button>
          <button type="button" class="hero__nav hero__nav--next" data-hero="next" aria-label="Next featured project">&#8250;</button>
          <div class="hero__dots">${dots}</div>
        </div>
        <div class="hero__thumbs">${thumbs}</div>
      </section>`;
  }

  function showSlide(next) {
    const slides = view.querySelectorAll(".hero__slide");
    if (!slides.length) return;
    heroIndex = (next + slides.length) % slides.length;
    slides.forEach((el, i) => el.classList.toggle("is-active", i === heroIndex));
    view.querySelectorAll("[data-dot]").forEach((el, i) =>
      el.classList.toggle("is-active", i === heroIndex));
    view.querySelectorAll("[data-thumb]").forEach((el, i) =>
      el.classList.toggle("is-active", i === heroIndex));
  }

  function startHero() {
    stopHero();
    if (reduceMotion || !view.querySelector("#hero-stage")) return;
    heroTimer = setInterval(() => showSlide(heroIndex + 1), HERO_INTERVAL);
  }

  function stopHero() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = null;
  }

  /* One delegated listener for the life of the page; the hero is re-rendered
     underneath it whenever the view changes. */
  function wireHero() {
    heroIndex = 0;
    if (!heroWired) {
      heroWired = true;
      view.addEventListener("click", event => {
        const nav = event.target.closest("[data-hero]");
        const dot = event.target.closest("[data-dot]");
        const thumb = event.target.closest("[data-thumb]");
        if (nav) showSlide(heroIndex + (nav.dataset.hero === "next" ? 1 : -1));
        else if (dot) showSlide(Number(dot.dataset.dot));
        else if (thumb) showSlide(Number(thumb.dataset.thumb));
        else return;
        startHero();
      });
      view.addEventListener("mouseover", event => {
        if (event.target.closest("#hero-stage")) stopHero();
      });
      view.addEventListener("mouseout", event => {
        if (event.target.closest("#hero-stage")) startHero();
      });
      view.addEventListener("focusin", event => {
        if (event.target.closest("#hero-stage")) stopHero();
      });
    }
    startHero();
  }

  /* ---------- sections ---------- */

  function railSection(collection) {
    const items = byCollection(collection.slug);
    if (!items.length) return "";
    return `<section class="section">
        <div class="section__head">
          <div>
            <h2>${esc(collection.name)}</h2>
            <p>${esc(collection.tagline)}</p>
          </div>
          <a class="section__link" href="${esc(collection.page)}">All ${items.length} &rarr;</a>
        </div>
        <div class="rail">${items.map(cardMarkup).join("")}</div>
      </section>`;
  }

  function collectionTiles() {
    const tiles = COLLECTIONS.map(collection => {
      const items = byCollection(collection.slug);
      const motif = items.length ? items[0].art.motif : "prism";
      const art = artMarkup({ title: collection.name, art: { motif, hue: collection.hue } });
      return `<a class="tile" href="${esc(collection.page)}">
          ${art}
          <div class="tile__inner">
            <span class="tile__count">${String(items.length).padStart(2, "0")} PROJECTS</span>
            <h3>${esc(collection.name)}</h3>
            <p>${esc(collection.tagline)}</p>
          </div>
        </a>`;
    }).join("");

    return `<section class="section">
        <div class="section__head">
          <div>
            <h2>Browse the library</h2>
            <p>${PROJECTS.length} projects across ${COLLECTIONS.length} collections.</p>
          </div>
        </div>
        <div class="grid">${tiles}</div>
      </section>`;
  }

  /* ---------- views ---------- */

  function renderHome() {
    view.innerHTML =
      heroMarkup(featuredProjects()) +
      collectionTiles() +
      COLLECTIONS.map(railSection).join("");
    wireHero();
    document.title = "BooRadly — Game Library";
  }

  function renderGames() {
    const collections = COLLECTIONS.slice();
    const total = PROJECTS.length;

    view.innerHTML = `<header class="page-head">
        <p class="eyebrow">${total} games</p>
        <h1>Games</h1>
        <p>Browser-ready arcade runs, music quizzes, learning games, and small worlds. Nothing to install.</p>
      </header>` +
      collections.map(collection => `<section class="section">
          <div class="section__head">
            <div>
              <h2>${esc(collection.name)}</h2>
              <p>${esc(collection.tagline)}</p>
            </div>
            <a class="section__link" href="${esc(collection.page)}">Open collection &rarr;</a>
          </div>
          <div class="grid">${byCollection(collection.slug).map(cardMarkup).join("")}</div>
        </section>`).join("");

    document.title = "Games — BooRadly";
  }

  function renderSearch(term) {
    const query = term.trim().toLowerCase();
    const hits = PROJECTS.filter(project =>
      [project.title, project.blurb, project.type, project.tech, ...(project.tags || [])]
        .join(" ").toLowerCase().includes(query));

    view.innerHTML = `<header class="page-head">
        <p class="eyebrow">${hits.length} result${hits.length === 1 ? "" : "s"}</p>
        <h1>&ldquo;${esc(term.trim())}&rdquo;</h1>
      </header>` +
      (hits.length
        ? `<div class="grid">${hits.map(cardMarkup).join("")}</div>`
        : `<p class="empty">Nothing matched &mdash; try &ldquo;quiz&rdquo;, &ldquo;unity&rdquo;, or &ldquo;data&rdquo;.</p>`);

    document.title = "Search — BooRadly";
  }

  /* ---------- routing ---------- */

  function setActiveNav(key) {
    document.querySelectorAll("[data-nav]").forEach(link =>
      link.classList.toggle("is-active", link.dataset.nav === key));
  }

  function render() {
    stopHero();
    const term = searchInput ? searchInput.value : "";

    if (term.trim()) {
      setActiveNav("");
      renderSearch(term);
      return;
    }

    /* #apps is retired; anything that is not #games lands on the home view. */
    if (location.hash.slice(1) === "games") {
      setActiveNav("games");
      renderGames();
    } else {
      setActiveNav("home");
      renderHome();
    }
  }

  if (searchInput) {
    let debounce;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(render, 140);
    });
    searchInput.addEventListener("keydown", event => {
      if (event.key === "Escape") { searchInput.value = ""; render(); }
    });
  }

  window.addEventListener("hashchange", () => {
    if (searchInput) searchInput.value = "";
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  });

  render();
})();
