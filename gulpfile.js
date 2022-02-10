const gulp = require('gulp');

// Api
const { series,  watch} = require('gulp');

// Plugins
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
var rename = require("gulp-rename");


/* Production */

function buildSass() {
    return gulp.src('src/assets/sass/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('dist/assets/css'));
}

function buildJS() {
    return gulp.src(['src/assets/js/controller/*.js', 'src/assets/js/model/*.js', 'src/assets/js/view/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
}

function buildHtmlmin() {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}

function compressImage() {
    return gulp.src('src/assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img'))
}

/* Development */

function IncludeSass() {
    return gulp.src('src/assets/sass/*.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('dist/assets/css'));
}

function includeHtml() {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
}

function includeJS() {
    return gulp.src(['src/assets/js/controller/*.js', 'src/assets/js/model/*.js', 'src/assets/js/view/*.js'])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('dist/assets/js'));
}


exports.build = series(buildSass, buildJS, buildHtmlmin, compressImage);
exports.start = series(IncludeSass, includeHtml, includeJS);
