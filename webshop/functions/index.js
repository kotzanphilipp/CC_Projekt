module.exports = {
  ...require("./controllers/auth-middleware"),
  ...require("./controllers/produkte-firestore-api"),
  ...require("./controllers/sqlFunction"),
};
