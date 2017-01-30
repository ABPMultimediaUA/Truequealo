var gulp = require('gulp'),
  clean = require('gulp-clean');

/**
 * Clean task for distribution folder.
 */
gulp.task('clean:dist', function() {
  return gulp.src('dist')
  .pipe(clean({force: true}));
});

/**
 * General clean task.
 */
gulp.task('clean', ['clean:dist']);
