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
                        src: 'build/main.js',
                        dest: 'dp/main.js',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/javascript',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                        //                      headers: {'Content-type': 'text/javascript', 'Content-Encoding': 'gzip', 'Cache-Control': 'max-age=3600, must-revalidate'}
                    }, {
                        src: 'build/main.css',
                        dest: 'dp/main.css',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/css',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    },

                    {
                        src: 'index.html',
                        dest: 'dp/index.html',
                        gzip: true,
                        headers: {
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

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 's3']);

};
