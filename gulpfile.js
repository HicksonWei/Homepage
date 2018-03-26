const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const minimist = require('minimist');

//初始化
gulp.task('copyFonts', () => {
  return gulp.src('./node_modules/font-awesome/fonts/**')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('copyFontAwesome', () => {
  return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('./public/css'));
});

gulp.task('copyJq', () => {
  return gulp.src('./node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('./.tmp/vendors'));
});

gulp.task('copyJustifiedGallery', () => {
  return gulp.src('./.tmp/vendors/justifiedGallery.min.css')
    .pipe(gulp.dest('./public/css'));
});

//設置初始環境參數
const envOptions = {
  string: 'env',
  default: {env: 'develop'}
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

//將 .jade 編譯成 .html
gulp.task('jade', () => {
  return gulp.src('./source/**/*.jade')
    .pipe($.plumber())
    .pipe($.pug($.if(options.env === 'develop', {
      pretty: true
    })))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

//將 .scss 或 .sass 編譯成 .css
gulp.task('scss', () => {
  const plugins = [
    autoprefixer({
      browsers: ['last 3 version', '> 5%']
    })
  ];
  return gulp.src('./source/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested'
    })).on('error', $.sass.logError)
    .pipe($.postcss(plugins))
    .pipe($.if(options.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

//將 source 中的 .js 整合成一支
gulp.task('babel', () => {
  return gulp.src('./source/js/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['env']
    }))
    .pipe($.order([
      'scroll.js',
      'nav.js',
      'carousel.js',
      'life.js'
    ]))
    .pipe($.concat('all.js'))
    .pipe($.if(options.env === 'production', $.uglify({
      compress: {
        drop_console: true
      }
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});

//外部 .js 整合後匯入
gulp.task('vendorJs', () => {
  return gulp.src('./.tmp/vendors/**/*.js')
    .pipe($.order([
      'jquery.js',
      'Chart.bundle.min.js',
      'patternomaly.js',
      'jquery.justifiedGallery.min.js'
    ])).pipe($.concat('vendors.js'))
    .pipe($.if(options.env === 'production', $.uglify()))
    .pipe(gulp.dest('./public/js'));
});

//畫面同步
gulp.task('browserSync', () => {
  return browserSync.init({
    server: {
      baseDir: './public'
    }, 
    reloadDebounce: 2000
  });
});

//壓縮圖片(耗時)
gulp.task('imgMin', () => {
  return gulp.src('./source/img/*')
    .pipe($.if(options.env === 'production', $.imagemin()))
    .pipe(gulp.dest('./public/img'));
});

//偵聽檔案變更，執行指定任務
gulp.task('watch', () => {
  gulp.watch('./source/**/*.jade', ['jade']);
  gulp.watch('./source/scss/**/*.scss', ['scss']);
  gulp.watch('./source/js/**/*.js', ['babel']);
});

//交付前刪除 .tmp 及 public 重建
gulp.task('clean', () => {
  return gulp.src(['./public'], {read: false})
    .pipe($.clean());
});


//初始動作 gulp init
gulp.task('init', ['copyFonts', 'copyFontAwesome', 'copyJq']);
//開發模式，偵聽中 gulp
gulp.task('default', $.sequence('jade', 'scss', 'babel', 'vendorJs', 'imgMin', 'browserSync', 'watch'));
//交付 gulp build --production
gulp.task('build', $.sequence('clean', 'jade', 'scss', 'babel', 'vendorJs', 'copyFonts', 'copyFontAwesome', 'copyJustifiedGallery', 'imgMin'))
//部署 gulp deploy (master要先推上github)
gulp.task('deploy', () => {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});