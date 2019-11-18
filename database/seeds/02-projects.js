
exports.seed = function(knex) {
  return knex('projects').insert([
    {user_id: 1, project_name: 'python'},
    {user_id: 2, project_name: 'data science'},
    {user_id: 3, project_name: 'computer science'}
  ]);
};
