import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to add .js extension to import paths that don't have it
function fixImportsInFile(filePath) {
  console.log(`Fixing imports in: ${filePath}`);

  // Read the file
  let content = fs.readFileSync(filePath, "utf8");

  // Replace relative imports that don't have file extensions
  // This regex looks for import statements with relative paths that don't end with a file extension
  const importRegex = /from\s+["'](\.[^"']*?)["']/g;
  content = content.replace(importRegex, (match, importPath) => {
    // If the import path doesn't already have an extension and doesn't end with a directory separator
    if (!importPath.match(/\.[a-zA-Z0-9]+$/) && !importPath.endsWith("/")) {
      return `from "${importPath}.js"`;
    }
    return match;
  });

  // Also fix dynamic imports
  const dynamicImportRegex = /import\s*\(\s*["'](\.[^"']*?)["']\s*\)/g;
  content = content.replace(dynamicImportRegex, (match, importPath) => {
    if (!importPath.match(/\.[a-zA-Z0-9]+$/) && !importPath.endsWith("/")) {
      return `import("${importPath}.js")`;
    }
    return match;
  });

  // Write the file back
  fs.writeFileSync(filePath, content);
}

// Function to recursively process a directory
function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      fixImportsInFile(fullPath);
    }
  }
}

// Start processing from the dist directory
const distDir = path.join(__dirname, "dist");
processDirectory(distDir);

console.log("All imports fixed successfully!");

