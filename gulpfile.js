var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    cssimport = require('gulp-cssimport'),
    prefix = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// js paths
var jsLibs = 'js/vendor/**/*.js',
    jsApp = 'js/app.js',
    jsDest = 'js/';

// scss tasks
gulp.task('sass', function () {
    return gulp.src('./*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssimport())
        .pipe(prefix())
        .pipe(cleanCSS({ level: 1 }))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});

// js tasks
gulp.task('scripts', function () {
    return gulp.src([jsLibs, jsApp])
        .pipe(concat('app.js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(livereload());
});

// html includes
gulp.task('fileinclude', function () {
    gulp.src(['start.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

// gulp watch
gulp.task('watch', function () {
    gulp.watch('./*.scss', ['sass']);
    gulp.watch('./*.js', ['scripts']);
});

// default task
gulp.task('default', gulp.series('sass', 'scripts', 'fileinclude', 'watch'));

// livereload init
livereload.listen();