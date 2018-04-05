exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('quizzes', function(table) {
			table.boolean('public');
		}),
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('quizzes', function(table) {
			table.dropColumn('public');
		}),
	]);
};
