const {dest, task, src, series, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');

const PATH = {
  htmlFiles: [
    './**/*.html',
    './src/pages/**/*.html',
  ],
  cssFolder: './src/css',
  cssMinFiles: './src/css/**/*.min.css',
  scssRoot: './src/scss/style.scss',
  scssFiles: './src/scss/**/*.scss',
  scssFolder: './src/scss',
  jsFiles: [
    './src/js/**/*.js',
    '!./src/js/**/bundle.js',
    '!./src/js/**/*.min.js',
  ],
  jsMinFiles: './src/js/**/*.min.js',
  jsFolder: './src/js',
  jsBundleName: 'bundle.js',
  buildFolder: './dist',
};

const PLUGINS = [
  autoprefixer({
    overrideBrowserslist: ['last 5 versions', '> 1%'],
    cascade: true,
  }),
  mqpacker({sort: sortCSSmq}),
];

const browserSyncConfig = {
  server: {
    baseDir: './',
  },
};

function syncInit() {
  browserSync.init(browserSyncConfig);
}

function lintJS() {
  return src(PATH.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())  // Форматирование ошибок
    .pipe(eslint.failAfterError());  // Завершение с ошибкой, если найдены ошибки
}

function scss() {
  return src(PATH.scssRoot)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(csscomb())
    .pipe(postcss(PLUGINS))
    .pipe(dest(PATH.cssFolder))
    .pipe(browserSync.stream());
}

function scssMin() {
  const pluginsExtended = [...PLUGINS, cssnano({preset: 'default'})];
  return src(PATH.scssRoot)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(csscomb())
    .pipe(postcss(pluginsExtended))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(PATH.cssFolder));
}

function scssDev() {
  return src(PATH.scssRoot, {sourcemaps: true})
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss(PLUGINS))
    .pipe(dest(PATH.cssFolder, {sourcemaps: true}))
    .pipe(browserSync.stream());
}

function comb() {
  return src(PATH.scssFiles)
    .pipe(csscomb())
    .pipe(dest(PATH.scssFolder));
}

async function reload() {
  browserSync.reload();
}

function watchFiles() {
  syncInit();
  watch(PATH.scssFiles, scss);
  watch(PATH.htmlFiles, reload);
  watch(PATH.jsFiles, lintJS).on('change', browserSync.reload);
}

function watchDevFiles() {
  syncInit();
  watch(PATH.scssFiles, scssDev);
  watch(PATH.htmlFiles, reload);
  watch(PATH.jsFiles, lintJS).on('change', browserSync.reload);
}

function concatJS() {
  return src(PATH.jsFiles)
    .pipe(concat(PATH.jsBundleName))
    .pipe(dest(PATH.jsFolder));
}

function uglifyJS() {
  return src(PATH.jsFiles)
    .pipe(terser({
      toplevel: true,
      output: {quote_style: 3},
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(PATH.jsFolder));
}

function buildHTML() {
  return src(PATH.htmlFiles)
    .pipe(dest(PATH.buildFolder + '/templates'));
}

function buildCSS() {
  return src(PATH.cssMinFiles)
    .pipe(dest(PATH.buildFolder + '/css'));
}

function buildJS() {
  return src(PATH.jsMinFiles)
    .pipe(dest(PATH.buildFolder + '/js'));
}

async function clearFolder() {
  const del = (await import('del')).deleteAsync;
  return del([PATH.buildFolder], {force: true});
}

exports.min = scssMin;
exports.scss = series(scss);
exports.comb = comb;
exports.concat = concatJS;
exports.uglify = uglifyJS;
exports.del = clearFolder;
exports.build = series(clearFolder, parallel(buildHTML, buildCSS, buildJS));
exports.lint = lintJS;
exports.watch = watchFiles;
exports.watchDev = watchDevFiles;
