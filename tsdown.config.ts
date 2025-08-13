import { defineConfig } from 'tsdown'

export default defineConfig({
  // Entry points for the build
  entry: ['./src/index.ts'],
  
  // Output configuration
  format: ['esm'], // ESM format for modern Node.js/Bun
  outDir: './dist',
  
  // Add shebang for executable
  banner: {
    js: '#!/usr/bin/env node'
  },
  
  // Clean output directory before build
  clean: true,
  
  // Generate declaration files
  dts: true,
  
  // Target modern Node.js (compatible with Bun)
  target: 'node20',
  
  // Minify for production builds
  minify: process.env.NODE_ENV === 'production',
  
  // Generate source maps for debugging
  sourcemap: true,
  
  // External dependencies (don't bundle these)
  external: [
    // Keep MCP SDK external since it's a peer dependency
    '@modelcontextprotocol/sdk',
    'zod'
  ],
  
  // Tree-shaking configuration
  treeshake: true,
  
  // Platform specific optimizations
  platform: 'node',
  
  // Bundle analysis
  metafile: true
})