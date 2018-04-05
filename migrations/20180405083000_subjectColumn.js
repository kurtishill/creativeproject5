exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('quizzes', function(table) {
			table.string('subject');
		}),
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('quizzes', function(table) {
			table.dropColumn('subject');
		}),
	]);
};