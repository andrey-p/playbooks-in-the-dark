export const toggleArrayEntry = (
  id: string,
  selected: boolean,
  entries: string[]
): string[] => {
  entries = entries.concat();
  const idx = entries.indexOf(id);

  if (selected && idx === -1) {
    entries.push(id);
  } else if (!selected && idx > -1) {
    entries.splice(idx, 1);
  }

  return entries;
};
