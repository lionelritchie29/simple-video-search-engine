window.addEventListener('DOMContentLoaded', () => {
  const resultCardTemplate = document.getElementById('result-card-template');
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
    let index = 0;
    for (const resultElm of results) {
      const data = currentResults[index];
      const resultCard = resultCardTemplate.content.cloneNode(true);
      const elm = resultCard.getElementById('result-card');
      const thumbnail = resultCard.getElementById('result-card-thumbnail');
      const title = resultCard.getElementById('result-card-title');
      const person = resultCard.getElementById('result-card-by');
      const viewCount = resultCard.getElementById('result-card-view-count');

      elm.setAttribute('data-index', index);
      thumbnail.src = data.thumbnailImage.url;
      title.innerHTML = data.title;

      if (data.richSnippet.person) {
        person.innerText = data.richSnippet.person.name;
      }

      if (data.richSnippet.videoobject) {
        viewCount.innerText = data.richSnippet.videoobject.interactioncount;
      }

      elm.addEventListener('click', function (e) {
        overlayElement.style.display = 'flex';
        const curr = currentResults[dataIdx];

        const dataIdx = e.target.offsetParent.getAttribute('data-index');
        if (curr.richSnippet.videoobject) {
          overlayIframeElm.src = curr.richSnippet.videoobject.embedurl;
          activeOverlayLink = curr.richSnippet.videoobject.url;
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
