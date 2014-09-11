var gulp = require('gulp');
var livereload = require('gulp-livereload');
var prefix = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');

gulp.task('server', function(next) {
  var connect = require('connect');
  server = connect();
  var serveStatic = require('serve-static');
  server.use(serveStatic('./')).listen(process.env.PORT || 8080, next);
});

gulp.task('autoprefixer', function() {
  return gulp.src('bourbon/style.css')
  .pipe(prefix(["last 15 version", "> 1%", "ie 8", "ie 7"]))
  .pipe(gulp.dest('www/style/'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
	cssFormat: 'sass',
    cssName: 'sprite.sass',
	padding: 10,
	algorithm: 'diagonal',
	cssVarMap: function(sprite) {
                    sprite.name = 'sprite-' + sprite.name
                }
  }));
  spriteData.img.pipe(gulp.dest('www/image'));
  spriteData.css.pipe(gulp.dest('bourbon/library'));
});


gulp.task('watch', ['server'], function() {
  var server = livereload();
  
  gulp.watch('bourbon/style.css',['autoprefixer']);
  
  gulp.watch('sprite/*.png',['sprite']);
  
  gulp.watch('bourbon/library/sprite.sass').on('change', function(file) {
      server.changed(file.path);
  });
  
  gulp.watch('www/**/*').on('change', function(file) {
      server.changed(file.path);
  });
  
  gulp.watch('bourbon/**/*').on('change', function(file) {
      server.changed(file.path);
  });
});
