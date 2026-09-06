/* BooRadly — collection pages (Mini Games, Music Quizzes, etc.).
   The page declares which collection it is via <body data-collection="...">.
   Requires catalog.js to be loaded first. */

(function () {
  const view = document.querySelector("#view");
  const slug = document.body.dataset.collection;
  const collection = collectionBySlug(slug);
  const searchInput = document.querySelector("#search-input");

  if (!collection) {
    view.innerHTML = `<p class="empty">Unknown collection.</p>`;
    return;
  }

  const items = byCollection(slug);
  const index = COLLECTIONS.filter(c => c.group === collection.group).indexOf(collection) + 1;
  const groupLabel = collection.group === "games" ? "Games" : "Apps";

  function heroMarkup() {
    const motif = items.length ? items[0].art.motif : "prism";
    const art = artMarkup({ title: collection.name, art: { motif, hue: collection.hue } });
    return `<section class="collection-hero">
        ${art}
        <div class="collection-hero__inner">
          <p class="eyebrow">${groupLabel} / ${String(index).padStart(2, "0")} &middot; ${items.length} projects</p>
          <h1>${esc(collection.name)}</h1>
          <p>${esc(collection.tagline)}</p>
        </div>
      </section>
      <div class="crumbs">
        <a href="index.html#home">Library</a> &rsaquo;
        <a href="index.html#${collection.group}">${groupLabel}</a> &rsaquo;
        <span>${esc(collection.name)}</span>
      </div>`;
  }

  function elsewhereMarkup() {
    const others = COLLECTIONS.filter(c => c.slug !== slug);
    if (!others.length) return "";
    const tiles = others.map(other => {
      const otherItems = byCollection(other.slug);
      const motif = otherItems.length ? otherItems[0].art.motif : "prism";
      return `<a class="tile" href="${esc(other.page)}">
          ${artMarkup({ title: other.name, art: { motif, hue: other.hue } })}
          <div class="tile__inner">
            <span class="tile__count">${String(otherItems.length).padStart(2, "0")} PROJECTS</span>
            <h3>${esc(other.name)}</h3>
          </div>
        </a>`;
    }).join("");

    return `<section class="section">
        <div class="section__head"><div><h2>Elsewhere in the library</h2></div></div>
        <div class="grid">${tiles}</div>
      </section>`;
  }

  function render() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const shown = query
      ? items.filter(project =>
          [project.title, project.blurb, project.type, project.tech, ...(project.tags || [])]
            .join(" ").toLowerCase().includes(query))
      : items;

    view.innerHTML = heroMarkup() +
      `<section class="section">
        <div class="section__head">
          <div>
            <h2>${query ? `${shown.length} match${shown.length === 1 ? "" : "es"}` : "All projects"}</h2>
            ${query ? "" : `<p>Select a project to open it. Everything runs in the browser.</p>`}
          </div>
        </div>
        ${shown.length
          ? `<div class="grid">${shown.map(cardMarkup).join("")}</div>`
          : `<p class="empty">Nothing in this collection matched.</p>`}
      </section>` +
      (query ? "" : elsewhereMarkup());
  }

  if (searchInput) {
    searchInput.placeholder = `Search ${collection.name}…`;
    let debounce;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(render, 140);
    });
    searchInput.addEventListener("keydown", event => {
      if (event.key === "Escape") { searchInput.value = ""; render(); }
    });
  }

  document.title = `${collection.name} — BooRadly`;
  render();
})();
