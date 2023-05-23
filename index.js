const onSearchResultReadyCallback = (name, q, promos, results, resultsDiv) => {
  document.getElementById('search-results').style.display = 'none';
  console.log({ name, q, promos, results, resultsDiv });
};

const onStartSearchCallback = (gname, query) => {
  return `${query}`;
};

window.addEventListener('DOMContentLoaded', () => {
  window.__gcse || (window.__gcse = {});
  // (window.__gcse.parsetags = 'explicit'),
  window.__gcse.searchCallbacks = {
    web: {
      starting: onStartSearchCallback,
      ready: onSearchResultReadyCallback,
    },
  };
});
