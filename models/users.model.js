module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    workplace: { type: DataTypes.STRING, allowNull: false },
    profile: { type: DataTypes.STRING, allowNull: false },

    role: {
      type: DataTypes.ENUM("admin", "customer"),
      defaultValue: "customer",
    },
  });

  // Virtuals
  return User;
};
