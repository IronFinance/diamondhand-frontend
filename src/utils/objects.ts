export function toPair<T>(x: Record<string, T>) {
  return Object.keys(x).map((key) => ({
    key,
    value: x[key],
  }));
}

export function fromPairs<T extends string | number, V>(keys: T[], values: V[]): Record<T, V> {
  if (!keys || !values) {
    return {} as Record<T, V>;
  }
  return keys.reduce((memo, current, index) => {
    return {
      ...memo,
      [current]: values[index],
    };
  }, {} as Record<T, V>);
}

export const mapObject = <T, V>(source: Record<string, T>, mapper: (x: T) => V) => {
  if (!source) {
    return;
  }

  return Object.entries(source).reduce(
    (memo, [key, value]) => ({
      ...memo,
      [key]: value ? mapper(value) : null,
    }),
    {} as Record<string, V>,
  );
};
