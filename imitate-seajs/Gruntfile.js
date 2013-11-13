module.exports = function(grunt) {

    // var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            seajs: {
                src: ['src/a.js', 'src/b.js'],
                dest: 'dest/mix.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);

}