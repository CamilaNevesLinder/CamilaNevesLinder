import path from 'node:path';
import { defineConfig } from 'vitest/config';

const shared = {
  globals: false as const,
  setupFiles: ['./src/tests/setup/vitest.setup.ts'],
};

const coverage = {
  provider: 'v8' as const,
  reporter: ['text', 'html', 'lcov'] as ('text' | 'html' | 'lcov')[],
  reportsDirectory: './coverage',
  include: ['src/**/*.{ts,tsx}'],
  exclude: [
    'src/**/*.d.ts',
    'src/types/**',
    'src/**/index.ts',
    'src/tests/**',
    'src/**/tests/**',
    'src/app/[locale]/**',
    'src/proxy.ts',
    'src/i18n.ts',
  ],
  thresholds: {
    lines: 90,
    functions: 90,
    branches: 90,
    statements: 90,
  },
};

const alias = {
  '@': path.resolve(import.meta.dirname, './src'),
};

export default defineConfig({
  resolve: { alias },
  test: {
    coverage,
    projects: [
      {
        resolve: { alias },
        test: {
          ...shared,
          name: 'unit-node',
          include: ['src/**/tests/unit/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      {
        resolve: { alias },
        test: {
          ...shared,
          name: 'unit-jsdom',
          include: ['src/**/tests/unit/**/*.{test,spec}.tsx'],
          environment: 'jsdom',
        },
      },
    ],
  },
});
