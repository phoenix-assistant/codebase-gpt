import { defineConfig } from 'tsup';
import { chmod, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

export default defineConfig({
  entry: {
    cli: 'src/cli.ts',
    index: 'src/index.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  async onSuccess() {
    const f = 'dist/cli.mjs';
    if (existsSync(f)) {
      const content = await readFile(f, 'utf8');
      if (!content.startsWith('#!/usr/bin/env node')) {
        await writeFile(f, '#!/usr/bin/env node\n' + content);
      }
      await chmod(f, 0o755);
    }
  },
});
