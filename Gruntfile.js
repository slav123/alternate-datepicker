module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON('aws-keys.json'), // Read the file
        uglify: {
            my_target: {
                files: {
                    'build/main.js': ['main.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'build/main.css': ['main.css']
                }
            }
        },
        replace: {},
        // use custom extension for the output file
        compress: {
            main: {
                options: {
                    mode: 'gzip',
                    level: 9
                },
                files: [
                    // Each of the files in the src/ folder will be output to
                    // the dist/ folder each with the extension .gz.js
                    {
                        expand: true,
                        cwd: 'build',
                        src: ['main.js'],
                        dest: 'build/',
                        ext: '.js.gz'
                    },
                     {
                        expand: true,
                        cwd: 'build',
                        src: ['main.css'],
                        dest: 'build/',
                        ext: '.css.gz'
                    },
                     {
                        expand: true,
                        
                        src: ['index.html'],
                        dest: 'build/',
                        ext: '.html.gz'
                    }
                ]
            }
        },
        s3: {
            options: {
                key: '<%= aws.AWSAccessKeyId %>',
                secret: '<%= aws.AWSSecretKey %>',
                bucket: 'review.dev64.net',
                access: 'public-read',
                debug: false,
                region: 'ap-southeast-2'
            },

            dev: {
                // These options override the defaults
                options: {
                    encodePaths: false,
                    maxOperations: 20
                },
                // Files to be uploaded.
                upload: [{
                        src: 'build/main.js.gz',
                        dest: 'dp/main.js',
                        gzip: true,
                        options: {
                            'Content-Type': 'text/javascript',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                        //                      headers: {'Content-type': 'text/javascript', 'Content-Encoding': 'gzip', 'Cache-Control': 'max-age=3600, must-revalidate'}
                    }, {
                        src: 'build/main.css.gz',
                        dest: 'dp/main.css',
                        gzip: true,
                        options: {
                            'Content-Type': 'text/css',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    },

                    {
                        src: 'build/index.html.gz',
                        dest: 'dp/index.html',
                        gzip: true,
                        options: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'compress', 's3']);

};