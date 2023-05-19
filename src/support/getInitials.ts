export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
