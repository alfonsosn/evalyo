'use strict';

// All used modules.
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('default', function () {

    livereload.listen();
    gulp.start('build');

  }
