

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    age: INTEGER,
    createdAt: DATE(6),
    updatedAt: DATE(6),
  });

  return class extends User {
    static associate() {
      app.model.User.hasMany(app.model.Post, { as: 'posts' });
    }
  };
}
