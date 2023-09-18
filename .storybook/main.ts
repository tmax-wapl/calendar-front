import type { StorybookViteConfig } from '@storybook/builder-vite';
import { mergeConfig } from 'vite';
import { join, dirname, resolve } from 'path';

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookViteConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
          '@common': resolve(__dirname, '../src/common'),
          '@constants': resolve(__dirname, '../src/common/constants'),
          '@wcomponents': resolve(__dirname, '../src/web/components'),
          '@mcomponents': resolve(__dirname, '../src/mobile/components'),
          '@contexts': resolve(__dirname, '../src/common/contexts'),
        },
      },
    });
  },
};

export default config;
