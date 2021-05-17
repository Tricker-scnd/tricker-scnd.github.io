export const randomInteger = (min: number, max: number) => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
export const isEven = (n: number) => {
  return n % 2 === 0;
};

export const numWithModClassic = (current: number, max: number) => {
  // цель оставить число спичек, сравнимое с 0 или 1 по модулю 4.
  let modZero = 1;
  let modDelimetr = 4;

  for (let num = 1; num <= max; num++) {
    if (num % 2 !== 0) {
      if ((current - num) % modDelimetr === 1) {
        return num;
      }
      if ((current - num) % modDelimetr === 0) {
        modZero = num;
      }
    }
  }
  return modZero;
};

export const numWithModCustom = (
  current: number,
  max: number,
  customStart: boolean = false,
  botScore: number,
) => {
  // для нечетного max, цель оставить текущее число спичек, сравнимое с 0 или 1 по модулю 4
  // для четного max, сравнимое с 0 или 1 по модулю 6 или число, сравнимое с 5 по модулю 6 в зависимости от четности botScore

  let modSecond = 1;
  let modDelimetr = max % 2 !== 0 ? 4 : 6;

  if (modDelimetr === 4)
    for (let num = 1; num <= max; num++) {
      if (num % 2 !== 0 || customStart) {
        if ((current - num) % modDelimetr === 0) {
          return num;
        }
        if ((current - num) % modDelimetr === 1) {
          modSecond = num;
        }
      }
    }
  else {
    for (let num = 1; num <= max; num++) {
      if (botScore % 2 === 0 || botScore === 0) {
        if ((current - num) % modDelimetr === 1) {
          return num;
        }
        if ((current - num) % modDelimetr === 0) {
          modSecond = num;
        }
      } else {
        if ((current - num) % modDelimetr === 5) {
          return num;
        }
      }
    }
  }

  return modSecond;
};
