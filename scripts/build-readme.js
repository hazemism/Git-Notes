const fs = require("fs");
const path = require("path");

const NOTES_DIR = "."; // scans the whole repo
const EXCLUDE = ["README.md", "node_modules", ".git", "scripts"];

function getMarkdownFiles(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    if (EXCLUDE.includes(item)) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(fullPath));
    } else if (item.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getMarkdownFiles(NOTES_DIR).sort();

let content = "";
let currentFolder = "";

for (const file of files) {
  const folder = path.dirname(file);
  if (folder !== currentFolder) {
    content += `\n## ${folder}\n\n`;
    currentFolder = folder;
  }
  const title = path.basename(file, ".md");
  const body = fs.readFileSync(file, "utf8");
  content += `### ${title}\n\n${body}\n\n---\n\n`;
}

const readme = fs.readFileSync("README.md", "utf8");
const updated = readme.replace(
  /<!-- NOTES:START -->[\s\S]*<!-- NOTES:END -->/,
  `<!-- NOTES:START -->\n${content}<!-- NOTES:END -->`,
);

fs.writeFileSync("README.md", updated);
