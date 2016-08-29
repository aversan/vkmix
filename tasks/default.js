import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('sass:dependencies', () => (
	runSequence(
		'sprites',
		'icons',
		'sass'
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'sass:dependencies',
			'templates'
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	gulp.start(
		'sass:dependencies',
		'templates',
		'scripts',
		'copy'
	)
));
