const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

gulp.task('browserify', function(){
  return browserify({entries: 'client/js/index.js'})
  .transform("babelify", {presets: ["es2015", "react", "stage-0"]})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('public'))
});

gulp.task('sass', function(){
  return gulp.src('client/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function(){
  gulp.watch('client/js/**/*.js', ['browserify']);
  gulp.watch('client/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['browserify', 'sass', 'watch']);
