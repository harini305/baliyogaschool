// Generates docs/phase-2/route-map.md from the build output and the redirect plan.
// Usage (after `npm run build`): node scripts/route-map.mjs
import fs from 'node:fs';
import path from 'node:path';
import { retiredRoutes } from '../src/data/redirects.mjs';

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.next', 'prerender-manifest.json'), 'utf8'));
const routes = Object.keys(manifest.routes).filter((r) => !r.startsWith('/_')).map((r) => (r === '/' ? '/' : `${r}/`)).sort();

const extracted = path.join(root, 'src', 'data', 'extracted');
const byPath = {};
for (const f of fs.readdirSync(extracted).filter((x) => x.endsWith('.json') && !x.startsWith('_'))) {
  const j = JSON.parse(fs.readFileSync(path.join(extracted, f), 'utf8'));
  byPath[j.path] = j;
}

const groups = {};
for (const r of routes) {
  const p = byPath[r];
  const key = p ? `${p.kind} — ${p.location}` : r.startsWith('/courses') ? 'course listings' : 'pages & hubs';
  (groups[key] ||= []).push({ r, title: p?.title || '' });
}

let md = `# Route map — Phase 2 frontend\n\nGenerated ${new Date().toISOString().slice(0, 10)} from the production build. Original URLs are preserved with trailing slashes.\n\n`;
md += `## Retained routes (${routes.length})\n\n`;
for (const [k, list] of Object.entries(groups).sort()) {
  md += `### ${k} (${list.length})\n\n`;
  for (const { r, title } of list) md += `- \`${r}\`${title ? ` — ${title}` : ''}\n`;
  md += '\n';
}
const byReason = {};
for (const x of retiredRoutes) (byReason[x.reason] ||= []).push(x);
md += `## Retired, merged and repaired routes (${retiredRoutes.length} redirects)\n\nApplied locally via \`next.config.mjs\` → \`redirects()\` (308). Production redirects on the live WordPress site have **not** been changed.\n\n`;
for (const [reason, list] of Object.entries(byReason)) {
  md += `### ${reason} (${list.length})\n\n`;
  if (list.length > 25) {
    md += `${list.length} URLs → \`${[...new Set(list.map((x) => x.to))].join('`, `')}\`. Full list: \`src/data/redirects.mjs\` / \`src/data/blog-redirects.json\`.\n\n`;
  } else {
    for (const x of list) md += `- \`${x.from}\` → \`${x.to}\`\n`;
    md += '\n';
  }
}
fs.mkdirSync(path.join(root, 'docs', 'phase-2'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs', 'phase-2', 'route-map.md'), md);
console.log(`route-map.md: ${routes.length} routes, ${retiredRoutes.length} redirects`);
