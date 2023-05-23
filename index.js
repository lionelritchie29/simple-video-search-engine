window.addEventListener('DOMContentLoaded', () => {
  const resultCardTemplate = document.getElementById('result-card-template');
  const originalSearchResultContainer = document.getElementById('search-results');
  const overlayElement = document.getElementById('view-overlay');
  const closeOverlayBtn = document.getElementById('view-overlay-close');
  const overlayIframeElm = document.getElementById('view-overlay-src');
  const overlayVisitBtn = document.getElementById('view-overlay-visit');

  let currentResults = [];
  let activeOverlayLink = '';

  const onSearchResultReadyCallback = (name, q, promos, results, resultsDiv) => {
    console.log({ results });
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
      resultCard.getElementById('result-card').setAttribute('data-index', index);

      resultCard.getElementById('result-card').addEventListener('click', function (e) {
        overlayElement.style.display = 'flex';

        const dataIdx = e.target.offsetParent.getAttribute('data-index');
        if (currentResults[dataIdx].richSnippet.videoobject) {
          overlayIframeElm.src = currentResults[dataIdx].richSnippet.videoobject.embedurl;
          activeOverlayLink = currentResults[dataIdx].richSnippet.videoobject.url;
        }
      });

      resultElm.innerHTML = '';
      resultElm.appendChild(resultCard);

      index++;
    }
  };

  const onStartSearchCallback = (gname, query) => {
    return `${query}`;
  };

  const onOverlayClose = () => {
    overlayElement.style.display = 'none';
  };

  const onOverlayVisit = () => {
    overlayElement.style.display = 'none';
    overlayVisitBtn.parentElement.href = activeOverlayLink;
  };

  closeOverlayBtn.addEventListener('click', onOverlayClose);
  overlayVisitBtn.addEventListener('click', onOverlayVisit);

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
