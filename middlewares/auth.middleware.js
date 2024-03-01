const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    // get a token from the client
    const token = req.headers.authorization;
    if (!token)
      // check token null or not
      return res
        .status(401)
        .json({ message: "you are not authorized, no token" });
    // verify token
    const verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY,
      (error, decoded) => {
        if (error)
          return res
            .status(401)
            .json({ message: "you are not authorized, invalid token" });
        else return decoded;
      }
    );
    // save id of user in the request object
    req.userId = verifyToken.sub;
    // save role of user in the request object
    req.userRole = verifyToken.role;
    // move to the next Middleware
    next();
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error authMiddleware is ${error}`);
  }
};
