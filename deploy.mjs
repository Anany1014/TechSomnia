import fs from 'fs';
import { execSync } from 'child_process';

// 1. Add base: './' to vite.config.js for /TechSomnia/ subfolder
let viteCfg = fs.readFileSync('vite.config.js', 'utf8');
if (!viteCfg.includes('base:')) {
  viteCfg = viteCfg.replace('plugins:', "base: './',\n  plugins:");
  fs.writeFileSync('vite.config.js', viteCfg);
}

// 2. Make /images/ paths relative (./images/) so all covers load on GitHub Pages
for (const file of ['src/data/games.js', 'src/components/LiquidBackground.jsx']) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replaceAll("'/images/", "'./images/").replaceAll('"/images/', '"./images/');
  fs.writeFileSync(file, content);
}

// 3. Build production bundle into dist/ (bypasses Windows '&' folder bug)
console.log('Building PLAYNOVA...');
execSync('node ./node_modules/vite/bin/vite.js build', { stdio: 'inherit' });

// 4. Push built dist/ folder to gh-pages branch
console.log('Deploying to GitHub Pages (gh-pages branch)...');
execSync('git init', { cwd: 'dist', stdio: 'inherit' });
execSync('git checkout -B gh-pages', { cwd: 'dist', stdio: 'inherit' });
execSync('git add -A', { cwd: 'dist', stdio: 'inherit' });
execSync('git commit -m "Deploy PLAYNOVA to GitHub Pages"', { cwd: 'dist', stdio: 'inherit' });
execSync('git push -f https://github.com/Anany1014/TechSomnia.git gh-pages', { cwd: 'dist', stdio: 'inherit' });

console.log('DONE! Now switch GitHub Pages branch to gh-pages.');