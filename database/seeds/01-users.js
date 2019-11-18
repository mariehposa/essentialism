
exports.seed = function(knex) {
  return knex('users').insert([
    {id: 1, username: 'mariam', email:'mariam@gmail.com', password: 'mariam'},
    {id: 2, username: 'uzoamaka', email:'uzoamaka@gmail.com', password: 'uzoamaka'},
    {id: 3, username: 'jayne', email:'jayne@gmail.com', password: 'jayne'}
  ]);
};
