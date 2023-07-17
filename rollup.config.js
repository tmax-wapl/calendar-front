const path = require('path');
const resolve = require('@rollup/plugin-node-resolve').default;
const alias = require('@rollup/plugin-alias');
const json = require('@rollup/plugin-json');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel').default;
const builtins = require('builtin-modules');
const nodePolyfills = require('rollup-plugin-node-polyfills');

function setUpRollup({ input, output, format }) {
  const packageJSON = require(path.join(__dirname, 'package.json'));
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const isESMFormat = format === 'es';

  const external = pkg => {
    const externals = [...Object.keys({ ...packageJSON.dependencies, ...packageJSON.peerDependencies }), ...builtins];

    return externals.some(externalPkg => {
      return pkg.startsWith(externalPkg);
    });
  };

  return {
    input,
    external,
    output: [
      {
        format,
        ...(isESMFormat
          ? {
              dir: path.dirname(output),
              entryFileNames: `[name]${path.extname(output)}`,
              preserveModulesRoot: isESMFormat ? path.dirname(input) : undefined,
            }
          : { file: output }),
      },
    ],
    plugins: [
      resolve({
        extensions,
      }),
      commonjs(),
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
      babel({
        extensions,
        babelHelpers: 'bundled',
        rootMode: 'upward',
      }),
      json(),
      nodePolyfills(),
    ],
    preserveModules: isESMFormat,
  };
}

export default [
  setUpRollup({
    input: './src/index.ts',
    output: 'dist/index.js',
    format: 'cjs',
  }),
];
