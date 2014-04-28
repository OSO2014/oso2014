module.exports = function(grunt){
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          sourcemap: true
        },
        files:[{
          expand: true,
          cwd: 'source/public/stylesheets',
          src: ['*.scss'],
          dest: 'dev/public/stylesheets',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files:[{
          expand: true,
          cwd: 'source/public/stylesheets',
          src: ['*.scss'],
          dest: 'dist/public/stylesheets',
          ext: '.css'
        }]
      }
    },
    csscomb: {
      dist: {
        files: {
          'dist/public/stylesheets/oso_style.css': ['dist/public/stylesheets/oso_style.css']
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      dist: {
        src: 'dist/public/stylesheets/oso_style.css',
        dest: 'dist/public/stylesheets/oso_style.css'
      }
    },
    csso: {
      dist: {
        files: {
          'dist/public/stylesheets/oso_style.css': ['dist/public/stylesheets/oso_style.css']
        }
      }
    },
    sprite: {
      default: {
        'src': 'source/public/images/_sprite/*.png',
        'destCSS': 'source/public/stylesheets/_sprite.scss',
        'destImg': 'source/public/images/_sprite.png',
        'engine': 'pngsmith'
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'source/public/images',
            src: ['*.{png,jpg,gif}'],
            dest: 'dev/public/images'
          },
          {
            src: ['source/public/javascripts/app.js'],
            dest: 'dev/public/javascripts/app.js'
          },
          {
            expand: true,
            cwd: 'source/public/stylesheets/fonts',
            src: ['*.{eot,svg,ttf,woff}'],
            dest: 'dev/public/stylesheets/fonts'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dev/public/images',
            src: ['*.{png,jpg,gif}'],
            dest: 'dist/public/images'
          },
          {
            expand: true,
            cwd: 'dev/views',
            src: ['*.jade'],
            dest: 'dist/views'
          },
          {
            expand: true,
            cwd: 'dev/routes',
            src: ['*.js'],
            dest: 'dist/routes'
          },
          {
            expand: true,
            cwd: 'dev/public/stylesheets/fonts',
            src: ['*.{eot,svg,ttf,woff}'],
            dest: 'dist/public/stylesheets/fonts'
          }
        ]
      }
    },
    styleguide: {
      dist: {
        files: {
          'docs/': 'source/public/stylesheets/'
        }
      }
    },
    imageoptim: {
      default: {
        src: ['dist/public/images']
      }
    },
    ngmin: {
      dev: {
        src: ['source/public/javascripts/app.js'],
        dest: 'dev/public/javascripts/app.js'
      }
    },
    uglify: {
      dist: {
        src: ['dev/public/javascripts/app.js'],
        dest: 'dist/public/javascripts/app.js'
      }
    },
    connect: { // 簡易サーバー
      default: {
        options: {
          base: 'dev'
        }
      }
    },
    watch: { // ファイル更新監視
      options: { // ライブリロードを有効にする
        livereload: true
      },
      src: {
        files: [
        'source/public/images/**/*.{png,jpg,gif}',
        'source/public/stylesheets/*.scss',
        'source/public/javascripts/*.js',
        'dev/**/*.html'],
        tasks: ['dev']
      }
    }
  });

  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-csscomb");
  grunt.loadNpmTasks("grunt-csso");
  grunt.loadNpmTasks("grunt-imageoptim");
  grunt.loadNpmTasks("grunt-ngmin");
  grunt.loadNpmTasks("grunt-rename");
  grunt.loadNpmTasks("grunt-spritesmith");
  grunt.loadNpmTasks("grunt-styleguide");

  grunt.registerTask('default', ['connect','watch']);
  grunt.registerTask('dev', ['sprite','sass:dev','copy:dev','ngmin:dev']);
  grunt.registerTask('dist', ['sass:dist','csscomb:dist','autoprefixer:dist','csso:dist','copy:dist','uglify:dist']);

}
