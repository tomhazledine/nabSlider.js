// include gulp
var gulp = require('gulp');

// Include plugins
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var scsslint = require('gulp-scsslint');
//var svgmin = require('gulp-svgmin');
//var svgSprites = require('gulp-svg-sprites');

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

// Set up image minification
gulp.task('images', function() {
  return gulp.src(['img/raw/**/*.jpg','img/raw/**/*.png'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      optimizationLevel: 7//,
      //progressive: true,
      //interlaced: true
    }))
    .pipe(gulp.dest('img/build'))
    .pipe(livereload(server));
});

// Icon Font
var fontName = 'icons';

gulp.task('iconfont', function(){
  gulp.src(['img/rawIcons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      //path: 'app/assets/css/templates/_icons.scss',
      targetPath: 'scss/_icons.scss',
      fontPath: '/fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      appendCodepoints:true
     }))
    .on('codepoints', function(codepoints, options) {
        // CSS templating, e.g.
        console.log(codepoints, options);
      })
    .pipe(gulp.dest('fonts/icons/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src([
    'js/raw/*.js'//,
    //'js/vendor/*.js'
  ])
  .pipe(concat('script.js'))
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

// SCSS Lint
gulp.task('scsslint', function() {
  gulp.src('./sass/*.scss')
    .pipe(scsslint('.scss-lint.yml'))
    .pipe(scsslint.reporter());
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('img/raw/**/*.*', ['images']);
  gulp.watch('js/raw/*.js', ['scripts']);

  gulp.watch('*.html').on('change', function(file) {
    livereload(server).changed(file.path);
  });
});

// Default Task
gulp.task('default', ['sass', 'watch', 'startLivereload']);