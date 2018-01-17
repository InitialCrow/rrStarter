import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import wepackStream from 'webpack-stream'
import webpack from 'webpack'
import devConfig from './dev-webpack.config.js'
import config from './webpack.config.js'
import sass from 'gulp-sass'
import clean from 'gulp-clean'




gulp.task('webpack', function(){
	return gulp.src('./app/ressources/js/index.js')
	.pipe(wepackStream(devConfig,webpack) )
	.pipe(gulp.dest('dist/ressources/js'))

})
gulp.task('webpack-build', function(){
	return gulp.src('./app/ressources/js/index.js')
	.pipe(wepackStream(config,webpack) )
	.pipe(gulp.dest('dist/ressources/js'))
})

gulp.task('clear-cache',function(){
	return gulp.src('./.cached_uglify')
	.pipe(clean())
})
gulp.task('clear-dist',function(){
	return gulp.src('./dist')
	.pipe(clean())
})
gulp.task('clear-modules',function(){
	return gulp.src('./node_modules')
	.pipe(clean())
})
gulp.task('sass', function () {
  return gulp.src('./app/ressources/scss/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/ressources/css'));
});

gulp.task('watch', function(){
	
	// gulp.watch('./app/server.js', ['webpack'])
	// gulp.watch('./app/views/**/*', ['webpack'])
	// gulp.watch('./app/ressources/js/**/*', ['webpack'])
	// gulp.watch('./app/controllers/**/*', ['webpack'])
	// gulp.watch('./app/models/**/*', ['webpack'])
	gulp.watch('./app/ressources/scss/**/*', ['sass'])
})

gulp.task('server', function(){
	nodemon({
		'script' : './dist/server.js'
	})


})

gulp.task('build',['webpack-build'])
gulp.task('serve',['webpack','watch','server'])
gulp.task('clear',['clear-cache','clear-dist','clear-modules'])