module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		browserify: {
			dist: {
				options: {
					transform: [
						["babelify", {
							loose: "all"
						}]
					]
				},
				files: {
					src: ['scripts/**/*.es6.js'],
					ext: '.js',
					dest: 'static'				}
			}
		},
		babel: {
			options: {
				sourceMap: true,
				stage: 0
			},
			files: {
				expand: true,
				src: ['scripts/**/*.es6.js'],
				ext: '.js',
				dest: 'static'
			}
		},
		watch: {
			files: ['static/**'],
			options: {
				livereload: true,
				sourcemap: true,
				stage: 0
			},
			babel: {
				expand: true,
				files: ['scripts/**/*.es6.js'],
				tasks: ['browserify']
			},
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
}