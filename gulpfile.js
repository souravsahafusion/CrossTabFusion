var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    iife = require("gulp-iife"),
    htmlreplace = require('gulp-html-replace');
function createErrorHandler(name) {
    return function (err) {
      console.error('Error from ' + name + ' in compress task', err.toString());
    };
}

gulp.task('default', function() {
    gulp.src('./js/**/*')
        .pipe(concat('chart.min.js'))
        //.pipe(iife())
        .pipe(uglify())
        .on('error', createErrorHandler('uglify'))
        .pipe(gulp.dest('./build/js/'));
   
    gulp.src('./json/*.json')
        .pipe(gulp.dest('./build/json/'));
   
    gulp.src('./css/*.css')
        .pipe(concat('chart.min.css'))
        /*.pipe(iife())*/
        .pipe(gulp.dest('./build/css/'));  
   
    gulp.src('index.html')
        .pipe(htmlreplace({
            'js': 'js/chart.min.js'
        }))
        .pipe(gulp.dest('./build/'));   
});





