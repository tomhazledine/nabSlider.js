// include gulp
var gulp = require('gulp');

// Include plugins
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

// Compass
gulp.task('sass', function() {
   gulp.src('sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: '',
      sass: 'sass'
    }))
    .on('error', function(err) {})
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(''))
    .pipe(rename('style.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(''))
    .pipe(livereload(server));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(['js/script.js'])
  .on('error', function(err) {})
  .pipe(gulp.dest('js'))
  .pipe(rename('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js'))
  .pipe(livereload(server));
});

// Livereload
gulp.task('startLivereload', function(){
  server.listen(35729);
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('js/*.js', ['scripts']);

  gulp.watch('*.html').on('change', function(file) {
    livereload(server).changed(file.path);
  });
});

// Default Task
gulp.task('default', ['sass', 'watch', 'startLivereload']);