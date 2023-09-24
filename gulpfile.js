const { src, dest, parallel, series, watch } = require('gulp');

// Load plugins
const cssnano = require('gulp-cssnano');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');

function clear() {
   return src('build/*', {
      read: false
   }).pipe(clean());
}

// CSS

function css() {
   const source = './src/css/styles.css';
   return src(source)
      .pipe(changed(source))
      .pipe(autoprefixer({ cascade: false, grid: 'autoplace', browsers: ['last 1 firefox version'] }))
      .pipe(cssnano())
      .pipe(dest('./build/css/'))
      .pipe(browsersync.stream());
}

// Optimize images

function img() {
   // return src('./src/images/**').pipe(imagemin()).pipe(dest('./build/images'));
   return src('./src/images/**').pipe(dest('./build/images'));
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
            noSource: true,
            ext: {
               min: '.js'
            }
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
