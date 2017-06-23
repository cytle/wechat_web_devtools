var gulp = require('gulp');
var replace = require('gulp-replace');
var path = require('path');

gulp.task('desktop', function(){
  gulp.src(['./desktop.example'])
    .pipe(replace('bar', 'foo'))
    .pipe(gulp.dest('dist/wechat_web_devtools.desktop'));
});
