module.exports = (asyncFn) => {
  return (req, res, next).catch((err) => {
    next(err);
  });
};
