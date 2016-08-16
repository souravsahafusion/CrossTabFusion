var gulp  = require('gulp'),
   gutil = require('gulp-util'),
   uglify  = require('gulp-uglify'),
   concat  = require('gulp-concat'),
   iife = require("gulp-iife");


gulp.task('default', function() {
     return     
});

var process = function(){
    gulp.src('./js/*.js')
       .pipe(concat('chartSourav.min.js'))
       .pipe(iife())
       .pipe(uglify())
       .pipe(gulp.dest('./build/js/'));
   gulp.src('./js/dataStruct.json')
       .pipe(concat('dataStruct.json'))
       .pipe(iife())
       .pipe(uglify())
       .pipe(gulp.dest('./build/js/'));
   gulp.src('./js/datastructure.json')
       .pipe(concat('datastructure.json'))
       .pipe(iife())
       .pipe(uglify())
       .pipe(gulp.dest('./build/js/'));    
   gulp.src('./css/*.css')
       .pipe(concat('style.css'))
       .pipe(iife())
       .pipe(uglify())
       .pipe(gulp.dest('./build/css/'));   
   gulp.src('index.html')
       .pipe(concat('index.html'))
       .pipe(iife())
       .pipe(uglify())
       .pipe(gulp.dest('./build/'));        
}