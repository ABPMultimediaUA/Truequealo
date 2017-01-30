var gulp = require('gulp'),
  connect = require('gulp-connect')
  cors = require('cors');

/**
 * Runs the server app.
 * @param {Object} gulp Reference to the current Gulp process.
 */
gulp.task('server:app', function() {
  connect.server({
    root: './',
    livereload: true,
    middleware: function() {
      return [cors()];
    },
  });
});

gulp.task('server', ['server:app']);
