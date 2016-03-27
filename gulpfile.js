var gulp = require('gulp'),
connect = require('gulp-connect'),
concat  = require('gulp-concat'),
browserSync = require('browser-sync'),
less = require('gulp-less'),
cssmin = require('gulp-minify-css'),
notify = require('gulp-notify'),
plumber = require('gulp-plumber'),
useref = require('gulp-useref'),
uglify = require('gulp-uglify'),
gulpIf = require('gulp-if'),
cache = require('gulp-cache'),
cssnano = require('gulp-cssnano'),
imagemin = require('gulp-imagemin'),
del = require('del'),
runSequence = require('run-sequence'),
sourcemaps = require('gulp-sourcemaps'),
jshint = require("gulp-jshint");

/*
//server task
gulp.task('webserver', function() {
  connect.server({
    port: 8081,
    livereload: true
  });
});
*/
// task
gulp.task('jsLint', function () {
    gulp.src('app/js/*/*.js') // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});
// browswer Sync 

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf(['*.js', '!*.min.js'], uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});
/*
gulp.task('buildjs', function(){
  return gulp.src('app/js/*.js')
    .pipe(sourcemaps.init()) //add sourcemaps
    .pipe(uglify())
    // combine all js in a js file
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('buildstyle', function(){
  return gulp.src('app/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css'));
});
*/

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

//	Copying Fonts to Dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});
/*
gulp.task('compileLess', function () {
    return gulp.src('app/less/*.less')
    	.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('app/css'))
	    .pipe(browserSync.reload({
	      stream: true
	    }));
});
*/
// connect to live reload less
gulp.task('compileLess', function () {
    return gulp.src('app/less/*.less')
      .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe(less())
      .pipe(gulp.dest('app/css'))
      .pipe(connect.reload());
});

gulp.task('changesWatch', ['browserSync', 'compileLess'], function () {
    gulp.watch('app/less/*.less', ['compileLess']); //当所有less文件发生改变时，调用testLess任务
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['compileLess','jsLint', 'useref', 'images', 'fonts'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['webserver', 'compileLess', 'jsLint', 'browserSync', 'changesWatch'],
    callback
  )
});
