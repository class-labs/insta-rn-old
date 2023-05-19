const apiUrl = process.env.GRAPHQL_API ?? "";
const [protocol = "", rest = ""] = apiUrl.split("//");
const [host = ""] = rest.split("/");

const baseUrl = `${protocol}//${host}`;

export function toFullyQualifiedUri(url: string) {
  return url.startsWith("/") ? baseUrl + url : url;
}
