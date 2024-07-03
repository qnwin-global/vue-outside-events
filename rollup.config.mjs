import babel from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript'
import license from 'rollup-plugin-license'
import pkg from './package.json' assert { type: 'json' }

const banner = `/**
 * ${pkg.name} @ ${pkg.version}
 * ${pkg.author}
 *
 * Vue directive to react to various events outside the current element
 *
 * License: ${pkg.license}
 */`

export default {
  input: 'src/index.ts',
  output: {
    name: 'vue3-outside-events',
    format: 'umd',
    file: 'dist/vue-outside-events.min.js'
  },
  plugins: [
    resolve({ browser: true }),
    typescript({ compilerOptions: { lib: ['es5', 'es6', 'dom'], target: 'es5' } }),
    babel({ babelrc: true, babelHelpers: 'bundled' }),
    terser(),
    filesize(),
    license({ banner })
  ]
}
