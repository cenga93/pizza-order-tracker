const { src, dest, series, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sassLint = require('gulp-sass-lint');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const iconfontCss = require('gulp-iconfont-css');
const iconfont = require('gulp-iconfont');
const nodemon = require('gulp-nodemon');
// ------------------------------------------------------------------------------------
// npm install --save-dev @babel/core @babel/preset-env
// npm install --save-dev gulp gulp-sourcemaps gulp-plumber gulp-sass-lint gulp-sass gulp-rename browser-sync del gulp-babel gulp-uglify gulp-iconfont-css gulp-iconfont gulp-nodemon
// ------------------------------------------------------------------------------------

const paths = {
  style: {
    src: 'src/assets/scss/**/*.scss',
    dest: `public/css/`,
    watchFiles: 'src/assets/scss/**/*.scss',
  },
  js: {
    src: 'src/assets/javascript/app.js',
    dest: 'public/js',
    watchFiles: 'src/assets/javascript/**/*.js',
  },
  icons: {
    src: 'src/assets/svg/*.svg',
    dest: 'public/svg',
  },
  sassLint: '.sass-lint.yml',
};

const Style = () => {
  return src(paths.style.src)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sassLint({
        options: {
          configFile: paths.sassLint,
        },
      })
    )
    .pipe(sassLint.format())
    .pipe(sass.sync({ outputStyle: 'compressed' }))
    .on('error', sass.logError)
    .pipe(
      rename({
        basename: 'app',
        suffix: '.min',
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.style.dest))
    .pipe(browserSync.stream());
};

const Script = () => {
  return src(paths.js.src)
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream());
};

const SvgToFont = () => {
  return src(paths.icons.src)
    .pipe(
      iconfontCss({
        fontName: 'svg-icons',
        cssClass: 'svgicon',
        path: 'src/assets/config/icon-font.scss',
        targetPath: '../../src/assets/scss/fonts/_icon-font.scss',
        fontPath: 'svg/',
      })
    )
    .pipe(
      iconfont({
        fontName: 'svg-icons',
        prependUnicode: false,
        formats: ['ttf', 'woff'], // eot
        fontHeight: 1000,
        normalize: true,
        centerHorizontally: true,
      })
    )
    .pipe(dest(paths.icons.dest));
};

const Clean = () => {
  return del(['public/css', 'public/js', 'public/svg'], { force: true });
};

const develop = () => {
  return nodemon({
    script: 'app.js',
    watch: ['app.js', 'src/**/*'],
    ignore: ['gulpfile.js', 'node_modules/**', 'public/**', 'src/assets/js'],
  }).on('restart', () => {
    browserSync.reload();
  });
};

const Watching = (cb) => {
  watch(paths.style.watchFiles, Style);
  watch(paths.js.watchFiles, Script);
  develop(cb);
};

// SvgToFont
const build = series(Clean, Style, Script, Watching);

exports.default = build;
