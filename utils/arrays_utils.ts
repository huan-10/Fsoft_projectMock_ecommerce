export const compareArrays = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) return false;
  const neww = (object: any) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );
  array1 = new Set(array1.map(neww));
  return array2.every((object) => array1.has(neww(object)));
};

export const filterArray = (
  array: { name: string; value: any }[],
  property: string
): any[] => {
  return array
    .filter((item) => item.name === property)
    .map((s) => {
      return s.value;
    });
};

export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const randomize = <T>(array: T[]): T[] => {
  return [...array].sort(() => 0.5 - Math.random());
};
