/** Une clases condicionales. Copia este helper junto con cualquier componente. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
