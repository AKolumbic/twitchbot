#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all TypeScript files
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith(".ts")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  console.log(`Processing ${filePath}`);
  let content = fs.readFileSync(filePath, "utf8");

  // Regular expression to match import statements from local files without .js extension
  const importRegex =
    /import\s+(?:{[^}]*}|\*\s+as\s+[^;]*|[^;{]*)\s+from\s+['"]([^'"]*)['"]/g;

  // Replace imports with .js extension for local files
  content = content.replace(importRegex, (match, importPath) => {
    // Skip node_modules imports
    if (importPath.startsWith(".") && !importPath.endsWith(".js")) {
      return match.replace(importPath, `${importPath}.js`);
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
}

// Main function
function main() {
  const srcDir = path.join(__dirname, "src");
  const tsFiles = findTsFiles(srcDir);

  console.log(`Found ${tsFiles.length} TypeScript files`);

  tsFiles.forEach((file) => {
    fixImportsInFile(file);
  });

  console.log("All imports fixed!");
}

main();

