// Generated on 2014-05-12 using generator-jade 0.6.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    folders: {
      app: 'app',
      www: 'www',
      tmp: '.tmp'
    },
    hoodie: {
      start: {
        options: {
          callback: function(config) {
            grunt.config.set('connect.proxies.0.port', config.stack.www.port);
          }
        }
      }
    },
    watch: {
      stylus: {
        files: '<%= folders.app %>/styles/**/*.styl',
        tasks: ['stylus']
      },
      server: {
        options: {
          livereload: true
        },
        files: [
          '<%= folders.tmp %>/*.html',
          '<%= folders.tmp %>/styles/{,*/}*.css',
          '{.tmp,<%= folders.app %>}/scripts/{,*/}*.js',
          '<%= folders.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      jade: {
        files: '<%= folders.app %>/jade/**/*.jade',
        tasks: ['jade']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      proxies: [
        {
          context: '/_api',
          host: 'localhost',
          port: false,
          https: false,
          changeOrigin: false
        }
      ],
      server: {
        options: {
          open: true,
          livereload: true,
          base: [
            '<%= folders.tmp %>',
            '<%= folders.app %>'
          ],
          middleware: function(connect, options, middlewares) {
            var proxySnippet = require('grunt-connect-proxy/lib/utils')
              .proxyRequest;

            middlewares.push(proxySnippet);

            return middlewares;
          }
        }
      },
      test: {
        options: {
          base: [
            '<%= folders.tmp %>',
            'test',
            '<%= folders.app %>'
          ]
        }
      },
      www: {
        options: {
          open: true,
          base: [
            '<%= folders.www %>'
          ],
          livereload: false
        }
      }
    },
    clean: {
      www: {
        files: [{
          dot: true,
          src: [
            '<%= folders.tmp %>',
            '<%= folders.www %>/*',
            '!<%= folders.www %>/.git*'
          ]
        }]
      },
      server: '<%= folders.tmp %>'
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    stylus: {
      compile: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/styles',
          src: ['{,*/}*.styl', '!**/_*'],
          dest: '<%= folders.tmp %>/styles',
          ext: '.css'
        }],
        options: {
          compress: false,
          // convert the css url() declaration into nib inline imaging function
          // this converts images smaller than 30kb to data url
          urlfunc: 'url'
        }
      }
    },
    jade: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/jade',
          src: ['{,*/}*.jade', '!**/_*'],
          dest: '.tmp/',
          ext: '.html'
        }],
        options: {
          client: false,
          pretty: true,
          basedir: '<%= folders.app %>/jade',
          data: function(dest, src) {

            var page = src[0].replace(/app\/jade\/(.*)\/index.jade/, '$1');

            if (page == src[0]) {
              page = 'index';
            }

            return {
              page: page
            };
          }
        }
      }
    },
    rev: {
      www: {
        files: {
          src: [
            '<%= folders.www %>/scripts/{,*/}*.js',
            '<%= folders.www %>/styles/{,*/}*.css',
            '<%= folders.www %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= folders.www %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= folders.tmp %>/index.html',
      options: {
        dest: '<%= folders.www %>'
      }
    },
    usemin: {
      html: ['<%= folders.www %>/{,*/}*.html'],
      css: ['<%= folders.www %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= folders.www %>']
      }
    },
    imagemin: {
      www: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= folders.www %>/images'
        }]
      }
    },
    svgmin: {
      www: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= folders.www %>/images'
        }]
      }
    },
    cssmin: {
      www: {
        files: {
          '<%= folders.www %>/styles/main.css': [
            '<%= folders.tmp %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      www: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/folders/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= folders.tmp %>',
          src: '{,*/}*.html',
          dest: '<%= folders.www %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      www: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.www %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*'
          ]
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: [
            'scripts/{,*/}*js', 'bower_components/**/*js'
          ]
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: [
            'styles/{,*/}*css'
          ]
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.www %>',
          src: [
            'assets/{,*/}*.*'
          ]
        }]
      }
    },
    release: {
      options: {
        npm: false
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['<%= folders.app %>/scripts/**/*js']
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'www') {
      return grunt.task.run(['build', 'connect:www:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'hoodie',
      'jade',
      'stylus',
      'configureProxies',
      'connect:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'stylus',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:www',
    'jade',
    'copy:js',
    'copy:css',
    'useminPrepare',
    'stylus',
    'imagemin',
    'svgmin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy:www',
    'copy:assets',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
