var gulp = require('gulp'),
  eslint = require('gulp-eslint');

/**
 * Clean task for distribution folder.
 */
gulp.task('lint:js:app', function() {
  return gulp.src(['src/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format());
});

/**
 * General clean task.
 */
gulp.task('lint', ['lint:js:app']);
