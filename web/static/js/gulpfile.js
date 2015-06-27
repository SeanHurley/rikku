var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  browserify({
    entries: 'app.js',
    extensions: ['.js', '.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('../../../priv/static/js'));
});

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function () {
    gulp.watch("./**/*.js", ['build']);
});
