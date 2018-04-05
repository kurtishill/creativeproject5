
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('quizzes', function(table) {
			table.increments('id').primary();
			table.json('quiz');
			table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
		}),
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('quizzes'),
	]);
};
