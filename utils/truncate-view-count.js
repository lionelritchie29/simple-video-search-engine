export const truncateViewCount = (count) => {
  let multiplyCount = 0;
  const multiplyMap = {
    1: 'k',
    2: 'm',
    3: 'b',
  };

  while (count > 1000) {
    multiplyCount++;
    count = count / 1000;
  }

  return `${Math.round(count)}${multiplyMap[multiplyCount] ?? ''}`;
};
