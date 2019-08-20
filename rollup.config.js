import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  preserveSymlinks: true,
	input: ['menu-slide.js'],
	output: {
		file: 'build/menu-slide.js',
    format: 'es',
		sourcemap: true
	},
	plugins: [
    resolve(),
    babel()
  ]
};