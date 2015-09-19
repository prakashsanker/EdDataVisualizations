module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		browserify: {
			options: {
				browserifyOptions: {
					debug:true
				}
			},
			dist: {
				options: {
					transform: [
						["babelify", {
							loose: "all"
						}]
					]
				},
				files: {
					"./static/dist/dest.js": ['static/scripts/**/*.es6.js']
				}
			}
		},
		watch: {
			scripts: {
				files: ["./scripts/*.es6.js"],
				tasks: ["browserify"]
			}
		}
	});
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["watch"]);
	grunt.registerTask("build", ["browserify"]);}