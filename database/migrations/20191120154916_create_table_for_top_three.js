
exports.up = function(knex) {
  return knex.schema
  .createTable('top_three', table => {
      table.increments('id')

      table.integer('value_id')
      .references('id')
      .inTable('values')                                                                                                     
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

      table.integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

      table.timestamp('created_at')
      .defaultTo(knex.fn.now())
  })

};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('top_three')
};
