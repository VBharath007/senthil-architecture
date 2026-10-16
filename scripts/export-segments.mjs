import { readdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
// Next 16 on Windows emits segment folders while the browser requests dot-separated paths.
// Keep the originals and provide portable aliases for ordinary static hosts.
function visit(dir) {
 for (const entry of readdirSync(dir, {withFileTypes:true})) {
  const file = join(dir,entry.name);
  if(entry.isDirectory()) visit(file);
  else if(entry.name.endsWith('.txt')) {
   const parts=file.split(/[\\/]/);
   const start=parts.findIndex(p=>p.startsWith('__next.'));
   if(start >= 0 && start < parts.length-1) copyFileSync(file,join(...parts.slice(0,start),parts.slice(start).join('.')));
  }
 }
}
visit('out');
