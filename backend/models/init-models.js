import _sequelize, { Sequelize } from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _contact from "./contact.js";
import _posts from "./posts.js";
import _roles from "./roles.js";
import _users from "./users.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
  }
);

function initModels(sequelize) {
  const contact = _contact.init(sequelize, DataTypes);
  const posts = _posts.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  users.belongsTo(roles, { as: "role", foreignKey: "role_id" });
  roles.hasMany(users, { as: "users", foreignKey: "role_id" });
  posts.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(posts, { as: "posts", foreignKey: "user_id" });

  return {
    contact,
    posts,
    roles,
    users,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };
