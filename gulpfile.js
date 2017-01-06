const connect = require('gulp-connect');
const electric = require('electric');
const ghPages = require('gulp-gh-pages');
const gulp = require('gulp');
const hljs = require('highlight.js');
const sass = require('gulp-sass');

const runSequence = require('run-sequence');

electric.registerTasks({
	gulp: gulp,
	plugins: ['electric-components'],
	markdownOptions: {
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(lang, str).value;
				}
				catch (err) {}
			}

			try {
				return hljs.highlightAuto(str).value;
			}
			catch (err) {}

			return '';
		}
	}

});

// CSS -------------------------------------------------------------------------

gulp.task('css', () => {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sass({includePaths: ['node_modules']}))
		.pipe(gulp.dest('dist/styles'));
});

// Images -------------------------------------------------------------------------

gulp.task('images', () => {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

// Javascripts

gulp.task('js', () => {
	return gulp.src('src/js/**/*')
		.pipe(gulp.dest('dist/js'));
});

// Fonts -----------------------------------------------------------------------

gulp.task('fonts', () => {
	return gulp.src('node_modules/westyle/build/fonts/**')
		.pipe(gulp.dest('dist/fonts'));
});

// Server ----------------------------------------------------------------------

gulp.task('server', () => {
	connect.server({
		root: 'dist',
		port: 8888
	});
});

// Deploy ----------------------------------------------------------------------

gulp.task('wedeploy', () => {
	return gulp.src('src/container.json')
		.pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['build'], () => {
	return gulp.src('dist/**/*')
		.pipe(ghPages({
			branch: 'wedeploy'
		}));
});

// Watch -----------------------------------------------------------------------

gulp.task('watch', () => {
    gulp.watch('src/**/*.+(md|soy|js|fm)', ['generate']);
    gulp.watch('src/styles/**/*.scss', ['css']);
    gulp.watch('src/img/**/*', ['images']);
});

// Build -----------------------------------------------------------------------

gulp.task('build', (callback) => {
	runSequence('generate', ['css', 'images', 'js', 'fonts', 'wedeploy'], callback);
});


 gulp.task('default', (callback) => {
    runSequence('build', 'server', 'watch', callback);
});