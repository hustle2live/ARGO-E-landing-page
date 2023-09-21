const { src, dest, parallel, series, watch } = require('gulp');

// Load plugins
const cssnano = require('gulp-cssnano');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
// const del = require('del');

// clean build

// function clear() {
//    return del('./bulid');
// }
function clear() {
   return src('./bulid/*', {
      read: false
   }).pipe(clean());
}

// CSS

function css() {
   const source = './src/css/styles.css';

   return src(source).pipe(changed(source)).pipe(cssnano()).pipe(dest('./build/css/')).pipe(browsersync.stream());
}

// Optimize images

function img() {
   return src('./src/images/**').pipe(imagemin()).pipe(dest('./build/images'));
}

// html

function html() {
   return src('./src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
      .pipe(dest('./build'))
      .pipe(browsersync.stream());
}

// javascript

function compressJS() {
   return src('./src/*.js')
      .pipe(
         minify({
            ext: {
               src: '-debug.js',
               min: '.js'
            },
            enoSourcext: true
         })
      )
      .pipe(dest('./build'));
}

// watch files

function watchFiles() {
   watch('./src/*.html', html);
   watch('./src/css/*', css);
   watch('./src/*.js', compressJS);
   watch('./src/images/*', img);
}

// browsersync

function browserSync() {
   browsersync.init({
      server: {
         baseDir: './build'
      },
      port: 3000
   });
}

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(html, css, img, compressJS));
exports.compressJS = compressJS;
exports.clear = clear;
