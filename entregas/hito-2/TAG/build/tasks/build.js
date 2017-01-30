var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect');

gulp.task('build:ts', function() {
  return gulp.src('src/**/*.ts')
  .pipe(ts({module: 'commonjs'}))
  .js
  .pipe(gulp.dest('./dist'));
});

gulp.task('build:sass', function() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['build:ts', 'build:sass']);
