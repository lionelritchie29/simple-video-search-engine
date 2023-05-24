import { constructUrlQueryMap } from './utils/construct-url-query-map.js';

window.addEventListener('DOMContentLoaded', () => {
  const resultCardTemplate = document.getElementById('result-card-template');
  const overlayElement = document.getElementById('view-overlay');
  const closeOverlayBtn = document.getElementById('view-overlay-close');
  const overlayIframeElm = document.getElementById('view-overlay-src');
  const overlayVisitBtn = document.getElementById('view-overlay-visit');
  const searchResultContainer = document.getElementById('search-results');

  let currentResults = [];
  let activeOverlayLink = '';

  const adjustNavigationStyle = () => {
    const queryMap = constructUrlQueryMap();

    if (queryMap['gsc.page'] && queryMap['gsc.page'] != '1') {
      console.log('Adjust Navigation');
      const pageNumberElms = searchResultContainer.getElementsByClassName(
        'gsc-cursor-numbered-page',
      );
      const nextElms = searchResultContainer.getElementsByClassName('gsc-cursor-container-next');
      const prevElms = searchResultContainer.getElementsByClassName(
        'gsc-cursor-container-previous',
      );

      if (pageNumberElms.length > 0) {
        pageNumberElms[0].innerText = pageNumberElms[0].innerText.replace('Page ', '');
      }

      if (prevElms.length > 0) {
        const p = document.createElement('p');
        p.innerText = 'Prev';
        prevElms[0].appendChild(p);
      }

      if (nextElms.length > 0) {
        const p = document.createElement('p');
        p.innerText = 'Next';
        nextElms[0].prepend(p);
      }
    }
  };

  const buildResultCard = (data, index) => {
    const hasVideoObject = data.richSnippet.videoobject;
    const hasPerson = data.richSnippet.person;
    const resultCard = resultCardTemplate.content.cloneNode(true);
    const elm = resultCard.getElementById('result-card');
    const thumbnail = resultCard.getElementById('result-card-thumbnail');
    const title = resultCard.getElementById('result-card-title');
    const person = resultCard.getElementById('result-card-by');
    const viewCount = resultCard.getElementById('result-card-view-count');

    elm.setAttribute('data-index', index);
    thumbnail.src = data.thumbnailImage.url;
    title.innerHTML = data.title;

    if (hasPerson) {
      person.innerText = data.richSnippet.person.name;
    }

    if (hasVideoObject) {
      viewCount.innerText = data.richSnippet.videoobject.interactioncount;
    }

    elm.addEventListener('click', function (e) {
      overlayElement.style.display = 'flex';

      const dataIdx = e.target.offsetParent.getAttribute('data-index');
      const curr = currentResults[dataIdx];

      if (curr.richSnippet.videoobject) {
        overlayIframeElm.src = curr.richSnippet.videoobject.embedurl;
        activeOverlayLink = curr.richSnippet.videoobject.url;
      }
    });

    return resultCard;
  };

  const onSearchResultReadyCallback = (name, q, promos, results, resultsDiv) => {
    console.log({ results });
    currentResults = results;
  };

  const onResultRenderedCallback = (name, q, promos, results) => {
    let index = 0;
    for (const resultElm of results) {
      resultElm.innerHTML = '';
      const data = currentResults[index];
      const videoObject = data.richSnippet.videoobject;

      if (!videoObject || (videoObject.genre && videoObject.genre != 'Music')) {
        index++;
        continue;
      }

      const resultCard = buildResultCard(data, index);

      resultElm.appendChild(resultCard);
      index++;
    }

    adjustNavigationStyle();
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
