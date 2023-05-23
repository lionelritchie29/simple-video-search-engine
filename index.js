window.addEventListener('DOMContentLoaded', () => {
  const resultCardTemplate = document.getElementById('result-card-template');
  const originalSearchResultContainer = document.getElementById('search-results');
  let currentResults = [];

  const onSearchResultReadyCallback = (name, q, promos, results, resultsDiv) => {
    currentResults = results;
  };

  const onResultRenderedCallback = (name, q, promos, results) => {
    const resultElements = originalSearchResultContainer.getElementsByClassName('gsc-result');
    const adBlocks = originalSearchResultContainer.getElementsByClassName('gsc-adBlock');

    console.log({ adBlocks });

    let index = 0;
    for (const resultElm of resultElements) {
      const resultCard = resultCardTemplate.content.cloneNode(true);
      resultCard.getElementById('result-card-thumbnail').src =
        currentResults[index].thumbnailImage.url;
      resultCard.getElementById('result-card-title').innerHTML = currentResults[index].title;
      resultCard.getElementById('result-card-by').innerText =
        currentResults[index].richSnippet.person.name;
      resultCard.getElementById('result-card-url').innerText = currentResults[index].visibleUrl;
      if (currentResults[index].richSnippet.videoobject) {
        resultCard.getElementById('result-card-view-count').innerText =
          currentResults[index].richSnippet.videoobject.interactioncount;
      }

      resultElm.innerHTML = '';
      resultElm.appendChild(resultCard);
      index++;
    }
  };

  const onStartSearchCallback = (gname, query) => {
    return `${query}`;
  };

  window.__gcse || (window.__gcse = {});
  // (window.__gcse.parsetags = 'explicit'),
  window.__gcse.searchCallbacks = {
    web: {
      starting: onStartSearchCallback,
      ready: onSearchResultReadyCallback,
      rendered: onResultRenderedCallback,
    },
  };
});
