
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('quizzes', function(table) {
			table.string('name').primary();
			table.json('quiz');
			table.boolean('public');
			table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
		}),
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('quizzes'),
	]);
};