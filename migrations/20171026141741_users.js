
exports.up = function(knex, Promise) {
 	return knex.schema.createTable('users', function(table) {
 		table.increments();
 		table.string('email').notNullable().unique();
 		table.string('password_hash').notNullable();
 		table.boolean('confirmed');
 		table.string('confirmationToken');
 		table.timestamps();
 	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');  
};
