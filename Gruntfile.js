module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		babel: {
			options: {
				sourceMap: true,
				stage: 0
			},
			files: {
				expand: true,
				src: ['scripts/**/*.es6.js'],
				ext: '.js',
				dest: 'scripts'
			}
		},
		watch: {
			files: ['**/*'],
			options: {
				livereload: true
			},
			babel: {
				files: ['scripts/**/*.es6.js'],
				tasks: 'babel'
			},
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
}