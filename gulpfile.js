const gulp = require('gulp');

// Api
const { series,  watch} = require('gulp');

// Plugins
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglifyjs = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const purify = require('gulp-purify-css');
const uglifycss = require('gulp-uglifycss');

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
        .pipe(uglifyjs())
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

function compressSVG() {
    return gulp.src('src/assets/svg/*.svg')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/svg'))
}

function purifyCSS() {
    return gulp.src('dist/assets/css/style.min.css')
        .pipe(purify(['dist/assets/js/*.js', 'dist/*.html']))
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/assets/css'));
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

/* Watch */
function observer() {
    watch(['src/*.html', 'src/components/*.html'], includeHtml)
    watch('src/assets/img/*.*', compressImage)
    watch('src/assets/svg/*.*', compressSVG)
    watch(['src/assets/sass/**'], IncludeSass)
    watch('src/assets/js/**/*.js', includeJS)
}


exports.build = series(buildSass, buildJS, buildHtmlmin, compressImage, compressSVG, purifyCSS);
exports.start = series(IncludeSass, includeHtml, includeJS, compressImage, compressSVG, observer);
