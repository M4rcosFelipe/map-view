export function splitObject(object: any) {
  const entries = Object.entries(object);
  const array = entries.map(([key, value]) => {
    return { [key]: value };
  });

  return array;
}

export function removeDuplicatedObjectsById(arr: any[]) {
  const uniqueIds = Array.from(new Set(arr.map((item) => item.id)));
  const uniqueObjects = uniqueIds.map((id) => {
    return arr.find((item) => item.id == id);
  });
  return uniqueObjects;
}

export function isAllEmpty(array: any[]) {
  return array.every((element) => element === "");
}
