export function arraysAreEqual(array1: any, array2: any) {
  return JSON.stringify(array1) === JSON.stringify(array2)
}

function normalizeString(string: string): string {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function searchIncludes(stringSearch: string, stringInclude: string): boolean {
  return normalizeString(stringSearch).includes(normalizeString(stringInclude))
}
