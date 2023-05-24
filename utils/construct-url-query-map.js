export const constructUrlQueryMap = () => {
  const queries = window.location.hash.slice(1).split('&');
  const map = {};
  queries.forEach((q) => {
    const raw = q.split('=');
    map[raw[0]] = raw[1];
  });
  return map;
};
