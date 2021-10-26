const {
  series,
  parallel,
  src,
  dest,
  watch
} = require('gulp');
const clean = require('gulp-clean');
const include = require('gulp-file-include');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browsersync = require('browser-sync');
const fs = require("fs");
const replace = require('gulp-replace');

const path = {
  dist: {
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/img/',
    fonts: 'dist/fonts/'
  },
  src: {
    html: 'src/**/[^_]*.html',
    style: 'src/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    js: 'src/js/**/*.js'
  },
  watch: {
    html: 'src/**/*.html',
    style: 'src/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    js: 'src/js/**/*.js'
  },
  clean: './dist'
};

const serverConfig = {
  server: {
    baseDir: "./dist"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: "IT-academy",
  notify: false
};


const cleanDist = (cb) => {
  if(fs.existsSync('./dist')) {
    return src(path.clean)
      .pipe(clean());
  }
  cb();
};

const httpBuild = () => src(path.src.html)
  .pipe(include({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(replace(/(<link rel="stylesheet" href=".\/)(main.)scss(">)/, '$1css/$2css$3'))
  .pipe(dest(path.dist.html))
  .pipe(browsersync.stream());

const stylesBuild = () => src(path.src.style)
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass())
  .pipe(replace(/(url\(")[.|..\/]+(img\/.+\..+"\))/g, '$1../$2'))
  .pipe(plumber.stop())
  .pipe(sourcemaps.write('./maps/'))
  .pipe(dest(path.dist.css))
  .pipe(browsersync.stream());

const fontsBuild = () => src(path.src.fonts).pipe(dest(path.dist.fonts)).pipe(browsersync.stream());

const imgsBuild = () => src(path.src.img).pipe(dest(path.dist.img)).pipe(browsersync.stream());
const jsBuild = () => src(path.src.js).pipe(dest(path.dist.js)).pipe(browsersync.stream());

const server = () => {
  browsersync.init(serverConfig);
  
  watch(path.watch.html, httpBuild);
  watch(path.watch.style, stylesBuild);
  watch(path.src.img, imgsBuild);
  watch(path.src.fonts, fontsBuild);
  watch(path.src.js, jsBuild);
  
};

const build = series(
  cleanDist,
  parallel(httpBuild, stylesBuild, fontsBuild, imgsBuild, jsBuild));
exports.start = series(build, server);
exports.clean = series(cleanDist);
exports.build = series(build);

