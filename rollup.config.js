import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  moduleName: 'ReactResizeAware',
  format: 'umd',
  sourceMap: true,
  exports: 'named',
  external: ['react'],
  globals: {
    react: 'React',
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [['es2015', {modules: false}], 'stage-2'],
    }),
  ],
};
