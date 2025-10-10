export function hasChangelog(body) {
  const changelogHeadingRegex = /(^|\n)#{2,3}\s*Changelog\b[:\-–\s]*/i;
  const hasHeading = changelogHeadingRegex.test(body || "");
  const categoryRegex =
    /###\s*(Added|Changed|Deprecated|Removed|Fixed|Security)\b[\s\S]*?(?=\n#{1,3}\s|$)/gi;
  let hasBullet = false;
  let match;
  while ((match = categoryRegex.exec(body || "")) !== null) {
    const block = match[0];
    if (/^\s*[-*+]\s+\S+/m.test(block)) {
      hasBullet = true;
      break;
    }
  }
  return hasHeading && hasBullet;
}

if (
  import.meta.url === process.argv[1] ||
  import.meta.url === `file://${process.argv[1]}`
) {
  // quick CLI usage
  const fs = await import("fs");
  const body = fs.readFileSync(process.argv[2], "utf8");
  console.log(hasChangelog(body) ? "true" : "false");
}
