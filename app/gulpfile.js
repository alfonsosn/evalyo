'use strict';

// All used modules.
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');

// Linter tasks
// --------------------------------------------------------------

gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('lintJS', function () {
  return gulp.src(['./server/**/*.js', "!server/public/js/jquery-3.2.0.min.js"])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

// In case we end up using gulp to minimify our browser content

// gulp.task('buildJS', ['lintJS'], function () {
//     return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
//         .pipe(plumber())
//         .pipe(sourcemaps.init())
//         .pipe(concat('main.js'))
//         .pipe(babel())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('./public'));
// });

gulp.task('default', function () {
    livereload.listen();
    gulp.watch(['server/**/*.js'], ['lintJS']);
  })
