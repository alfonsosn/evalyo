'use strict';

// All used modules.
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('lintJS', function () {

  return gulp.src(['./server/**/*.js', "!server/public/js/*.js"])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());

});

gulp.task('default', function () {
    livereload.listen();
    gulp.watch(['server/**/*.js'], ['lintJS']);
  })
