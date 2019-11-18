
exports.up = function(knex) {
  return knex.schema
  .createTable('users', table => {
      table.increments('id')
      table.text('username', 128)
      .notNullable()
      table.string('email')
      .notNullable()
      table.string('password')
      .notNullable()
  })
  .createTable('projects', table => {
      table.increments('id')
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      table.string('project_name')
      .notNullable()
  })
  .createTable('values', table => {
    table.increments('id')
    table.string('value_name')
    .notNullable()
    })
    .createTable('relationship between projects and values', table => {
        table.increments('id')
        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        table.integer('value_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('values')
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('relationship between projects and values')
  .dropTableIfExists('values')
  .dropTableIfExists('projects')
  .dropTableIfExists('users')
};
