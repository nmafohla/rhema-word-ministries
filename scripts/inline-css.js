import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const assetsDir = path.join(distDir, 'assets');

try {
  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find(f => f.endsWith('.css'));
  
  if (cssFile) {
    const cssPath = path.join(assetsDir, cssFile);
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const htmlPath = path.join(distDir, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Locate the link tag for this CSS file and replace it with style tags containing the raw CSS
    const linkRegex = new RegExp(`<link rel="stylesheet"[^>]*href="/assets/${cssFile}"[^>]*>`, 'i');
    htmlContent = htmlContent.replace(linkRegex, `<style>${cssContent}</style>`);
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`[Inline CSS] Successfully inlined CSS from ${cssFile} into dist/index.html`);
  } else {
    console.log('[Inline CSS] No CSS file found in dist/assets');
  }
} catch (err) {
  console.error('[Inline CSS] Error:', err);
}
