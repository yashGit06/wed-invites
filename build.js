#!/usr/bin/env node

/**
 * Indian Wedding Invitation - Zero-Dependency Build & Assembly Engine
 * Zero Data Exposure: Does not bake personal data into HTML or JS bundles.
 * All data is processed by dataProcess.js and fetched dynamically at runtime.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SECTIONS_DIR = path.join(ROOT_DIR, 'sections');
const JS_DIR = path.join(ROOT_DIR, 'js');
const CSS_DIR = path.join(ROOT_DIR, 'css');
const IMAGES_DIR = path.join(ROOT_DIR, 'assets', 'images');

console.log('✨ Building Royal Indian Wedding Invitation Engine...');

// ---------------------------------------------------------------------------
// 1. Resolve Image Assets (Extension Agnostic)
// ---------------------------------------------------------------------------
const requiredImages = [
  'Bride Single',
  'Groom Single',
  'Couple Pic landscape orientation',
  'Couple Pic portrait orientation'
];

const VALID_IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

function resolveImageAsset(baseName) {
  const cleanBase = path.parse(baseName).name.toLowerCase();
  if (!fs.existsSync(IMAGES_DIR)) return null;
  const files = fs.readdirSync(IMAGES_DIR);
  return files.find(file => {
    const parsed = path.parse(file);
    return parsed.name.toLowerCase() === cleanBase && VALID_IMAGE_EXTS.includes(parsed.ext.toLowerCase());
  }) || null;
}

const resolvedImages = {};
let allImagesOk = true;

for (const imgName of requiredImages) {
  const base = path.parse(imgName).name;
  const matchedFile = resolveImageAsset(base);
  if (matchedFile) {
    resolvedImages[base] = matchedFile;
    console.log(`  📸 Asset "${base}" resolved to: ${matchedFile}`);
  } else {
    console.warn(`  ⚠️ Warning: Image not found in assets/images/ for: ${base} (any extension: ${VALID_IMAGE_EXTS.join(', ')})`);
    allImagesOk = false;
  }
}

if (allImagesOk) {
  console.log(`✅ Verified all ${requiredImages.length} image assets (extension-agnostic).`);
}

// ---------------------------------------------------------------------------
// 3. Assemble index.html from clean sections (No personal data baked in code)
// ---------------------------------------------------------------------------
const sectionFiles = [
  'head.html',
  'celebration-controls.html',
  'header.html',
  '__MAIN_OPEN__',
  'hero.html',
  'countdown.html',
  'couple.html',
  'celebrations.html',
  'places.html',
  'rsvp.html',
  '__MAIN_CLOSE__',
  'footer.html'
];

let assembledHtml = '';

for (const item of sectionFiles) {
  if (item === '__MAIN_OPEN__') {
    assembledHtml += '    <main id="main-content">\n';
    continue;
  }
  if (item === '__MAIN_CLOSE__') {
    assembledHtml += '    </main>\n';
    continue;
  }

  const filePath = path.join(SECTIONS_DIR, item);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing section file: ${filePath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(filePath, 'utf8').trimEnd();
  assembledHtml += content + '\n';
}

// Replace image paths with dynamically resolved filenames (so any extension is rendered)
for (const [baseName, actualFile] of Object.entries(resolvedImages)) {
  const safeBase = baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '(?:%20|\\s+)');
  const imgRegex = new RegExp(`(\\./assets/images/)${safeBase}\\.[a-zA-Z0-9]+`, 'g');
  assembledHtml = assembledHtml.replace(imgRegex, `$1${encodeURIComponent(actualFile)}`);
}

const targetHtmlPath = path.join(ROOT_DIR, 'index.html');
fs.writeFileSync(targetHtmlPath, assembledHtml, 'utf8');
console.log(`✅ Assembled clean index.html (${assembledHtml.split('\n').length} lines) from ${sectionFiles.length - 2} sections (no personal data exposed in code).`);

// ---------------------------------------------------------------------------
// 4. Bundle JS modules into app.js (Zero personal data in bundle code)
// ---------------------------------------------------------------------------
const jsModules = [
  'utils.js',
  'dataProcess.js',
  'data.js',
  'navigation.js',
  'couple.js',
  'timeline.js',
  'countdown.js',
  'map.js',
  'directory.js',
  'petals.js',
  'confetti.js',
  'main.js'
];

let bundledJs = `/**\n * Indian Wedding Invitation - Bundled Application Logic\n * Generated automatically by build.js\n * All wedding data fetched dynamically at runtime\n */\n\n`;

for (const mod of jsModules) {
  const modPath = path.join(JS_DIR, mod);
  if (!fs.existsSync(modPath)) {
    console.error(`❌ Missing JS module: ${modPath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(modPath, 'utf8').trim();
  bundledJs += `// --- Module: js/${mod} ---\n${content}\n\n`;
}

const targetJsPath = path.join(ROOT_DIR, 'app.js');
fs.writeFileSync(targetJsPath, bundledJs, 'utf8');
console.log(`✅ Bundled app.js (${bundledJs.split('\n').length} lines) from ${jsModules.length} JS modules.`);

// ---------------------------------------------------------------------------
// 5. Verify CSS Modular Architecture
// ---------------------------------------------------------------------------
const cssMainPath = path.join(CSS_DIR, 'main.css');
if (fs.existsSync(cssMainPath)) {
  console.log(`✅ Verified CSS modular architecture in css/main.css.`);
} else {
  console.error(`❌ Missing css/main.css!`);
  process.exit(1);
}

console.log('🎉 Build completed successfully with zero personal data exposed in code!');
