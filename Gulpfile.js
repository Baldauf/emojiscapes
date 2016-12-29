var gulp = require('gulp')
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , uglify = require('gulp-uglify')
  , sass = require('gulp-sass')
  , rename = require('gulp-rename')
  , prefix = require('gulp-autoprefixer')
  , browserSync = require('browser-sync').create()
  , gulpHelp = require('gulp-help')
  , svgSprite = require('gulp-svg-sprite');

gulp = gulpHelp(gulp);


//------------------------------------------------------------------------------
// Path configs

var paths = {
  js        : 'app/js/**/*.js',
  jsApp     : 'app/js/app.js',
  jsBuild   : 'build/js',
  scss      : 'app/style/scss/**/*.scss',
  scssMain  : 'app/style/scss/main.scss',
  svg       : 'app/svg/',
  css       : 'build/css'
};


//------------------------------------------------------------------------------
// Build Tasks

gulp.task('build-js', function() {
  return browserify(paths.jsApp)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsBuild))
    .pipe(browserSync.stream());
});

gulp.task('build-scss', 'builds the css un-minified', function() {
  return gulp.src(paths.scssMain)
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(prefix({browsers: ['last 2 versions']}))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

gulp.task('build', ['build-js', 'build-scss'])


gulp.task('svgsprite', function () {
  config = {
    mode  : {
      inline   : true,
      "symbol" : {
        "sprite"  : "sprite.svg"
      }
    }
  };

  gulp.src('**/*.svg', {cwd: paths.svg})
      .pipe(svgSprite(config)
        .on('error', function(e){ console.error(e) }))
      .pipe(gulp.dest(paths.svg));
})


//------------------------------------------------------------------------------
// Watch Tasks

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.js, ['build-js'])
  gulp.watch(paths.scss, ['build-scss'])
  gulp.watch(paths.svg + '**/*.svg', ['svgsprite'])
});



//------------------------------------------------------------------------------
// Serve Tasks

// Serve emojiscapes at localhost:3000 and reload/recompile on changes

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("**/*.html").on('change', browserSync.reload);
})