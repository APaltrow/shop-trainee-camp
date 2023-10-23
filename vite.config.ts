import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/shop-trainee-camp/',
  plugins: [react()],
  server: {
    open: true,
    host: true,
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@style': path.resolve(__dirname, './src/style'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@router': path.resolve(__dirname, './src/router'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
});
