var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

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

gulp.task('buildCSS', function() {
  gulp.src("../css/app.scss")
    .pipe(sass())
    .pipe(gulp.dest('../../../priv/static/css'));
});

gulp.task('default', ['build']);

gulp.task('watch', ['build', 'buildCSS'], function () {
    gulp.watch("./**/*.js", ['build']);
    gulp.watch("../css/*.scss", ['buildCSS']);
});
