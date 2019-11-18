
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'mariam', email:'mariam@gmail.com', password: 'mariam'},
    {username: 'uzoamaka', email:'uzoamaka@gmail.com', password: 'uzoamaka'},
    {username: 'jayne', email:'jayne@gmail.com', password: 'jayne'}
  ]);
};
