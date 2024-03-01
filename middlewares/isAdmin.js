exports.isAdmin = async (req, res, next) => {
  try {
    if (req.userRole !== "admin")
      return res.status(401).json({ message: "you are not admin" });
    next();
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error isAdmin is ${error}`);
  }
};
