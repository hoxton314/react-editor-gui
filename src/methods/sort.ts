export const sort = (strings: string[]) => {
  const sorted = strings?.sort((a, b) => a?.localeCompare(b))
  return sorted
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortObj = (objs: any[], property: string) => {
  const sorted = objs?.sort((a, b) => a[property]?.localeCompare(b[property]))
  return sorted
}
