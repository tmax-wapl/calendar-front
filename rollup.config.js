import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-minification';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import del from 'rollup-plugin-delete';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

process.env.BABEL_ENV = 'production';

function setUpRollup({ input, output }) {
  return {
    input,
    output,
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions,
        browser: true,
      }),
      alias({
        entries: {
          '@': path.resolve(__dirname, 'src'),
          '@common': path.resolve(__dirname, 'src/common'),
          '@constants': path.resolve(__dirname, 'src/common/constants'),
          '@api': path.resolve(__dirname, 'src/common/lib'),
          '@wcomponents': path.resolve(__dirname, 'src/web/components'),
          '@mcomponents': path.resolve(__dirname, 'src/mobile/components'),
          '@contexts': path.resolve(__dirname, 'src/common/contexts'),
        },
      }),
      json(),
      commonjs({
        include: /node_modules/,
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        typescript: ttypescript,
        tsconfig: './tsconfig.json',
      }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        plugins: [['@emotion', { sourceMap: true }]],
      }),
      terser(),
      svgr(),
      url(),
      postcss(),
      del({ targets: 'dist/*' }),
      replace({
        preventAssignment: true,
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
  };
}

export default [
  setUpRollup({
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        sourcemap: true,
        format: 'cjs',
      },
      // {
      //   file: 'dist/index.esm.js',
      //   format: 'esm',
      // },
    ],
  }),
];
