// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
import rehypePresetMinify from 'rehype-preset-minify';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationErrorLevel
} from '@shikijs/transformers'

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://kutay.boo',

  markdown: {
      shikiConfig: {
          theme: 'dracula',
          defaultColor: false,
          wrap: true,
          transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationErrorLevel(),
          ],
      },
      remarkPlugins: [remarkToc],
      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: true,
  },

  integrations: [mdx({
      rehypePlugins: [rehypePresetMinify],
      gfm: false,
  }), sitemap(), tailwind()],

  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});