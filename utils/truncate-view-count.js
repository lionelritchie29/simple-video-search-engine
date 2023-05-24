export const truncateViewCount = (count) => {
  let multiplyCount = 0;
  const multiplyMap = {
    1: 'K',
    2: 'M',
    3: 'B',
  };

  while (count > 1000) {
    multiplyCount++;
    count = count / 1000;
  }

  return `${Math.round(count)}${multiplyMap[multiplyCount] ?? ''}`;
};
