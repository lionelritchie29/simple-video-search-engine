window.addEventListener('DOMContentLoaded', () => {
  const resultContainer = document.getElementById('custom-search-results');
  const resultCardTemplate = document.getElementById('result-card-template');

  const onSearchResultReadyCallback = (name, q, promos, results, resultsDiv) => {
    document.getElementById('search-results').style.display = 'none';
    console.log({ name, q, promos, results, resultsDiv });

    resultContainer.innerHTML = '';
    results.forEach((result) => {
      const resultCard = resultCardTemplate.content.cloneNode(true);
      resultCard.getElementById('result-card-thumbnail').src = result.thumbnailImage.url;
      resultCard.getElementById('result-card-title').innerHTML = result.title;
      resultCard.getElementById('result-card-by').innerText = result.richSnippet.person.name;
      resultCard.getElementById('result-card-url').innerText = result.visibleUrl;
      if (result.richSnippet.videoobject) {
        resultCard.getElementById('result-card-view-count').innerText =
          result.richSnippet.videoobject.interactioncount;
      }

      resultContainer.appendChild(resultCard);
    });
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
    },
  };
});
