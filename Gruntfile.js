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
          src: [*.scss],
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
          src: [*.scss],
          dest: 'dist/public/stylesheets',
          ext: '.css'
        }]
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
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dev/public/images'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dev/public/images',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/public/images'
          }
        ]
      }
    }
  });
}
