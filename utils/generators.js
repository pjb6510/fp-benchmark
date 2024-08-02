export function* map(fn, iterable) {
  for (const item of iterable) {
    yield fn(item);
  }
}

export function* filter(fn, iterable) {
  for (const item of iterable) {
    if (fn(item)) {
      yield item;
    }
  }
}

export function reduce(fn, initialValue, iterable) {
  let accumulator = initialValue;

  for (const item of iterable) {
    accumulator = fn(accumulator, item);
  }

  return accumulator;
}

export function pipe(initialValue, ...fns) {
  return reduce((acc, fn) => fn(acc), initialValue, fns);
}

export function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...moreArgs) => curried(...args, ...moreArgs);
  };
}

export const curriedMap = curry(map);
export const curriedFilter = curry(filter);
export const curriedReduce = curry(reduce);
