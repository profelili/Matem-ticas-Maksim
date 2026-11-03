import { DifficultyLevel, Fraction, Operation, Problem } from '../types/fractions';
import { Language } from './i18n';

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function simplifyFraction(frac: Fraction): Fraction {
  if (frac.den === 0) return { num: 0, den: 1 };
  if (frac.num === 0) return { num: 0, den: 1 };

  let num = frac.num;
  let den = frac.den;

  if (den < 0) {
    num = -num;
    den = -den;
  }

  const divisor = gcd(num, den);
  return {
    num: num / divisor,
    den: den / divisor,
  };
}

export function areFractionsEqual(f1: Fraction, f2: Fraction): boolean {
  const s1 = simplifyFraction(f1);
  const s2 = simplifyFraction(f2);
  return s1.num === s2.num && s1.den === s2.den;
}

export function solveOperation(
  f1: Fraction,
  f2: Fraction,
  op: Operation,
  lang: Language = 'es'
): { result: Fraction; steps: string[] } {
  const steps: string[] = [];
  const isRu = lang === 'ru';

  switch (op) {
    case '+': {
      if (f1.den === f2.den) {
        if (isRu) {
          steps.push(`Знаменатели одинаковы (${f1.den}).`);
          steps.push(`Складываем числители: ${f1.num} + ${f2.num} = ${f1.num + f2.num}.`);
        } else {
          steps.push(`Los denominadores ya son iguales (${f1.den}).`);
          steps.push(`Sumamos directamente los numeradores: ${f1.num} + ${f2.num} = ${f1.num + f2.num}.`);
        }

        const raw = { num: f1.num + f2.num, den: f1.den };
        const simp = simplifyFraction(raw);
        if (simp.num !== raw.num || simp.den !== raw.den) {
          if (isRu) {
            steps.push(`Сокращаем, разделив на ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
          } else {
            steps.push(`Simplificamos dividiendo entre ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
          }
        }
        return { result: simp, steps };
      } else {
        const commonDenom = lcm(f1.den, f2.den);
        const m1 = commonDenom / f1.den;
        const m2 = commonDenom / f2.den;
        const n1 = f1.num * m1;
        const n2 = f2.num * m2;

        if (isRu) {
          steps.push(`Находим наименьшее общее кратное (НОК) для ${f1.den} и ${f2.den}: НОК = ${commonDenom}.`);
          steps.push(`Приводим дроби к общему знаменателю: (${f1.num} × ${m1})/(${f1.den} × ${m1}) = ${n1}/${commonDenom} и (${f2.num} × ${m2})/(${f2.den} × ${m2}) = ${n2}/${commonDenom}.`);
          steps.push(`Складываем числители: ${n1} + ${n2} = ${n1 + n2}/${commonDenom}.`);
        } else {
          steps.push(`Buscamos el mínimo común múltiplo (MCM) de ${f1.den} y ${f2.den}: MCM = ${commonDenom}.`);
          steps.push(`Convertimos las fracciones: (${f1.num} × ${m1})/(${f1.den} × ${m1}) = ${n1}/${commonDenom} y (${f2.num} × ${m2})/(${f2.den} × ${m2}) = ${n2}/${commonDenom}.`);
          steps.push(`Sumamos los nuevos numeradores: ${n1} + ${n2} = ${n1 + n2}/${commonDenom}.`);
        }

        const raw = { num: n1 + n2, den: commonDenom };
        const simp = simplifyFraction(raw);
        if (simp.num !== raw.num || simp.den !== raw.den) {
          if (isRu) {
            steps.push(`Сокращаем числитель и знаменатель на ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
          } else {
            steps.push(`Simplificamos dividiendo numerador y denominador entre ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
          }
        }
        return { result: simp, steps };
      }
    }
    case '-': {
      if (f1.den === f2.den) {
        if (isRu) {
          steps.push(`Знаменатели одинаковы (${f1.den}).`);
          steps.push(`Вычитаем числители: ${f1.num} - ${f2.num} = ${f1.num - f2.num}.`);
        } else {
          steps.push(`Los denominadores son iguales (${f1.den}).`);
          steps.push(`Restamos los numeradores: ${f1.num} - ${f2.num} = ${f1.num - f2.num}.`);
        }

        const raw = { num: f1.num - f2.num, den: f1.den };
        const simp = simplifyFraction(raw);
        if (simp.num !== raw.num || simp.den !== raw.den) {
          if (isRu) {
            steps.push(`Сокращаем результат: ${simp.num}/${simp.den}.`);
          } else {
            steps.push(`Simplificamos: ${simp.num}/${simp.den}.`);
          }
        }
        return { result: simp, steps };
      } else {
        const commonDenom = lcm(f1.den, f2.den);
        const m1 = commonDenom / f1.den;
        const m2 = commonDenom / f2.den;
        const n1 = f1.num * m1;
        const n2 = f2.num * m2;

        if (isRu) {
          steps.push(`Вычисляем общий знаменатель: НОК(${f1.den}, ${f2.den}) = ${commonDenom}.`);
          steps.push(`Домножаем дроби: ${n1}/${commonDenom} - ${n2}/${commonDenom}.`);
          steps.push(`Вычитаем числители: ${n1} - ${n2} = ${n1 - n2}/${commonDenom}.`);
        } else {
          steps.push(`Calculamos el común denominador con MCM(${f1.den}, ${f2.den}) = ${commonDenom}.`);
          steps.push(`Ampliamos: ${n1}/${commonDenom} - ${n2}/${commonDenom}.`);
          steps.push(`Restamos los numeradores: ${n1} - ${n2} = ${n1 - n2}/${commonDenom}.`);
        }

        const raw = { num: n1 - n2, den: commonDenom };
        const simp = simplifyFraction(raw);
        if (simp.num !== raw.num || simp.den !== raw.den) {
          if (isRu) {
            steps.push(`Сокращаем полученную дробь на ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
          } else {
            steps.push(`Simplificamos la fracción resultante dividiendo por ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
          }
        }
        return { result: simp, steps };
      }
    }
    case '*': {
      const rawNum = f1.num * f2.num;
      const rawDen = f1.den * f2.den;

      if (isRu) {
        steps.push(`Чтобы умножить дроби, перемножаем числители между собой и знаменатели между собой.`);
        steps.push(`Числитель: ${f1.num} × ${f2.num} = ${rawNum}.`);
        steps.push(`Знаменатель: ${f1.den} × ${f2.den} = ${rawDen}.`);
      } else {
        steps.push(`Para multiplicar fracciones, se multiplican numeradores entre sí y denominadores entre sí.`);
        steps.push(`Numerador: ${f1.num} × ${f2.num} = ${rawNum}.`);
        steps.push(`Denominador: ${f1.den} × ${f2.den} = ${rawDen}.`);
      }

      const raw = { num: rawNum, den: rawDen };
      const simp = simplifyFraction(raw);
      if (simp.num !== raw.num || simp.den !== raw.den) {
        if (isRu) {
          steps.push(`Сокращаем дробь на ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
        } else {
          steps.push(`Simplificamos dividiendo por ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
        }
      }
      return { result: simp, steps };
    }
    case '/': {
      const rawNum = f1.num * f2.den;
      const rawDen = f1.den * f2.num;

      if (isRu) {
        steps.push(`Чтобы разделить дроби, умножаем первую дробь на обратную второй (${f2.den}/${f2.num}).`);
        steps.push(`Перекрестное умножение: (${f1.num} × ${f2.den}) / (${f1.den} × ${f2.num}) = ${rawNum}/${rawDen}.`);
      } else {
        steps.push(`Para dividir fracciones, multiplicamos la primera fracción por el inverso de la segunda (${f2.den}/${f2.num}).`);
        steps.push(`Multiplicación cruzada: (${f1.num} × ${f2.den}) / (${f1.den} × ${f2.num}) = ${rawNum}/${rawDen}.`);
      }

      const raw = { num: rawNum, den: rawDen };
      const simp = simplifyFraction(raw);
      if (simp.num !== raw.num || simp.den !== raw.den) {
        if (isRu) {
          steps.push(`Сокращаем дробь на общий делитель ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
        } else {
          steps.push(`Simplificamos dividiendo por el divisor común ${gcd(raw.num, raw.den)}: ${simp.num}/${simp.den}.`);
        }
      }
      return { result: simp, steps };
    }
  }
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDistractors(correct: Fraction, f1: Fraction, f2: Fraction, op: Operation): Fraction[] {
  const distractors: Fraction[] = [];
  const addIfUnique = (candidate: Fraction) => {
    const simp = simplifyFraction(candidate);
    if (simp.den === 0) return;
    const isDup = distractors.some(d => areFractionsEqual(d, simp)) || areFractionsEqual(simp, correct);
    if (!isDup) distractors.push(simp);
  };

  if (op === '+') {
    addIfUnique({ num: f1.num + f2.num, den: f1.den + f2.den });
  } else if (op === '-') {
    addIfUnique({ num: Math.abs(f1.num - f2.num) || 1, den: f1.den + f2.den });
  }

  if (op === '/') {
    addIfUnique(simplifyFraction({ num: f1.num * f2.num, den: f1.den * f2.den }));
  } else if (op === '*') {
    addIfUnique(simplifyFraction({ num: f1.num * f2.den, den: f1.den * f2.num }));
  }

  if (correct.num !== 0) {
    addIfUnique({ num: correct.den, den: Math.abs(correct.num) });
  }

  addIfUnique({ num: correct.num + 1, den: correct.den });
  addIfUnique({ num: Math.max(1, correct.num - 1), den: correct.den });
  addIfUnique({ num: correct.num, den: correct.den + 1 });
  addIfUnique({ num: correct.num, den: Math.max(2, correct.den - 1) });

  let attempts = 0;
  while (distractors.length < 3 && attempts < 20) {
    attempts++;
    const randNum = getRandomInt(1, Math.max(4, correct.num + 3));
    const randDen = getRandomInt(2, Math.max(4, correct.den + 4));
    addIfUnique({ num: randNum, den: randDen });
  }

  const allOptions = [correct, ...distractors.slice(0, 3)];
  return allOptions.sort(() => Math.random() - 0.5);
}

export function generateProblem(
  preferredOp?: Operation,
  difficulty: DifficultyLevel = 'basico',
  customId?: string,
  lang: Language = 'es'
): Problem {
  const operations: Operation[] = ['+', '-', '*', '/'];
  const op = preferredOp || operations[Math.floor(Math.random() * operations.length)];

  let f1: Fraction = { num: 1, den: 2 };
  let f2: Fraction = { num: 1, den: 4 };

  if (difficulty === 'basico') {
    if (op === '+' || op === '-') {
      const sameDenom = Math.random() > 0.4;
      const den = [2, 3, 4, 5, 6][getRandomInt(0, 4)];
      if (sameDenom) {
        const n1 = getRandomInt(1, den - 1);
        const n2 = op === '-' ? getRandomInt(1, n1) : getRandomInt(1, den - n1 || 1);
        f1 = { num: n1, den };
        f2 = { num: n2, den };
      } else {
        const base = [2, 3][getRandomInt(0, 1)];
        const mult = base * 2;
        f1 = { num: 1, den: base };
        f2 = { num: 1, den: mult };
        if (op === '-' && f1.num / f1.den < f2.num / f2.den) {
          f1 = { num: mult - 1, den: mult };
          f2 = { num: 1, den: base };
        }
      }
    } else {
      f1 = { num: getRandomInt(1, 2), den: getRandomInt(2, 4) };
      f2 = { num: getRandomInt(1, 3), den: getRandomInt(2, 5) };
    }
  } else if (difficulty === 'intermedio') {
    const dens = [3, 4, 5, 6, 8, 10];
    const d1 = dens[getRandomInt(0, dens.length - 1)];
    let d2 = dens[getRandomInt(0, dens.length - 1)];
    if (d1 === d2) d2 = d1 === 8 ? 6 : 8;

    let n1 = getRandomInt(1, d1);
    let n2 = getRandomInt(1, d2);

    if (op === '-' && n1 / d1 < n2 / d2) {
      const tempN = n1; const tempD = d1;
      n1 = n2; f1 = { num: n1, den: d2 };
      n2 = tempN; f2 = { num: n2, den: tempD };
    } else {
      f1 = { num: n1, den: d1 };
      f2 = { num: n2, den: d2 };
    }
  } else if (difficulty === 'avanzado') {
    f1 = { num: getRandomInt(2, 8), den: getRandomInt(3, 12) };
    f2 = { num: getRandomInt(2, 8), den: getRandomInt(3, 12) };
  } else {
    f1 = { num: getRandomInt(3, 12), den: getRandomInt(4, 15) };
    f2 = { num: getRandomInt(3, 12), den: getRandomInt(4, 15) };
  }

  if (f1.den === 0) f1.den = 2;
  if (f2.den === 0) f2.den = 3;

  const { result, steps } = solveOperation(f1, f2, op, lang);
  const options = generateDistractors(result, f1, f2, op);

  let concept = '';
  if (lang === 'ru') {
    if (op === '+') concept = 'Сложение дробей: найдите общий знаменатель (НОК) или сложите числители, если знаменатели уже одинаковы.';
    if (op === '-') concept = 'Вычитание дробей: приведите к общему знаменателю и аккуратно вычтите числители.';
    if (op === '*') concept = 'Умножение дробей: перемножьте числитель на числитель, а знаменатель на знаменатель.';
    if (op === '/') concept = 'Деление дробей: умножьте первую дробь на перевернутую (обратную) вторую дробь.';
  } else {
    if (op === '+') concept = 'Suma de fracciones: busca un común denominador o suma numeradores si ya coincide.';
    if (op === '-') concept = 'Resta de fracciones: homogeniza denominadores y resta los numeradores con cuidado.';
    if (op === '*') concept = 'Multiplicación: multiplica numerador por numerador y denominador por denominador.';
    if (op === '/') concept = 'División: multiplica la primera fracción por la fracción recíproca de la segunda.';
  }

  return {
    id: customId || `prob_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    f1,
    f2,
    operation: op,
    difficulty,
    correctAnswer: result,
    options,
    stepByStep: steps,
    conceptExplanation: concept,
    visualType: (f1.den <= 10 && f2.den <= 10) ? 'circle' : 'bar',
  };
}
