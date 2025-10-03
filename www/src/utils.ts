export const cn = (...classNames: Array<string | null | undefined>): string => {
  return classNames
    .reduce<
      string[]
    >((prev, className) => (typeof className === 'string' ? [...prev, className] : prev), [])
    .join(' ')
}
