'use strict';

// All used modules.
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');

// Linter tasks
// --------------------------------------------------------------

gulp.task('reload', function () {
    return livereload.reload();
});

gulp.task('lintJS', function () {
  return gulp.src(['./server/**/*.js', "!server/static/bundle/*.js"])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./server/static/stylesheets/style.css', ['reload']);
    gulp.watch(['server/**/*.js'], ['lintJS']);
  })
