import gulp from 'gulp'
import gutil from 'gulp-util';
import nodemon from 'gulp-nodemon'
import livereload from 'gulp-livereload'
import webpack from 'webpack'
import webpackConf from './webpack.config.js'
import sass from 'gulp-sass'
import clean from 'gulp-clean'

gulp.task('webpack', function(){
	webpack(webpackConf, function(err, stats) {
	        if(err) throw new gutil.PluginError("webpack", err);
	        gutil.log("[webpack]", stats.toString({
	            colors: true
	        }));
	        return gulp.src([
		'./dist/views/**/*.ejs',
		])
		.pipe(livereload())
	    });
})
gulp.task('clear-cache',function(){
	return gulp.src('./.cached_uglify')
	.pipe(clean())
})
gulp.task('clear-dist',function(){
	return gulp.src('./dist')
	.pipe(clean())
})
gulp.task('sass', function () {
  return gulp.src('./app/ressources/scss/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/ressources/css'));
});


gulp.task('html', function(){
	return gulp.src([
		'./dist/views/index.html',

	])
	.pipe(livereload())
})

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('./app/server.js', ['webpack'])
	gulp.watch('./app/views/**/*', ['webpack'])
	gulp.watch('./app/ressources/js/**/*', ['webpack'])
	gulp.watch('./app/controllers/**/*', ['webpack'])
	gulp.watch('./app/models/**/*', ['webpack'])
	gulp.watch('./app/ressources/scss/**/*', ['sass','webpack'])
})

gulp.task('server', function(){
	nodemon({
		'script' : './dist/server.js'
	})
})

gulp.task('serve',['sass','server','watch'])
gulp.task('clear',['clear-cache','clear-dist'])