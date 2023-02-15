export function groupBy<V>(keySelector: (value: V) => string, values: V[]) {
  const groups: {
    [key: string]: V[]
  } = {}  

  values.forEach(value => {
    const key = keySelector(value);
    groups[key] = [...groups[key] || [], value]
  });

  return groups;
}

export function groupByMany<V>(keysSelector: (value: V) => string[], values: V[]) {
  const groups: {
    [key: string]: V[]
  } = {}  

  values.forEach(value => {
    keysSelector(value).forEach(key => {
      groups[key] = [...groups[key] || [], value]
    });
  });

  return groups;
}