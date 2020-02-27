var gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  watch = require('gulp-watch'),
    babel = require('gulp-babel');

gulp.task('copy', function () {
  // CSS
  gulp.src('node_modules/@glidejs/glide/dist/css/glide.core.min.css')
      .pipe(gulp.dest('app/css/'));

  // JS
  gulp.src('node_modules/@glidejs/glide/dist/glide.min.js')
      .pipe(gulp.dest('app/js/'));    

  return gulp.src('node_modules/lazysizes/lazysizes.min.js')
      .pipe(gulp.dest('app/js/'));
});

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});
 
gulp.task('watch', function () {
  return gulp.watch('app/scss/**/*.scss', gulp.series(['sass']));
});

gulp.task('babel', () =>
  gulp.src('app/js/script.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'))
);  
