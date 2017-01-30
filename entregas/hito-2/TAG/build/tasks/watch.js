var gulp = require('gulp'),
  connect = require('gulp-connect');

/**
 * Watchs for changes
 */
gulp.task('watch:js', function() {
  return gulp.watch(['src/**/*.js'])
  .pipe(connect.reload());
});

gulp.task('watch:sass', function() {
  gulp.watch(['src/**/*.scss'], ['build:sass'])
});


gulp.task('watch', ['watch:js', 'watch:sass']);
