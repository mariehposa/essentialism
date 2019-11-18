
exports.seed = function(knex) {
  return knex('values').insert([
    {value_name: 'Athletic ability'},
    {value_name: 'Art and literature'},
    {value_name: 'creativity'},
    {value_name: 'Kindness and generosity'},
    {value_name: 'Living in the moment'},
    {value_name: 'Membership'},
    {value_name: 'Music'},
    {value_name: 'My community'},
    {value_name: 'My moral principles'},
    {value_name: 'Nature and the environment'},
    {value_name: 'Relationships with friends and family'},
    {value_name: 'Sense of humor'},
    {value_name: 'Success in my career'},
    {value_name: 'Other'}
  ]);
};
