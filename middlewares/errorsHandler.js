function errorsHandler(err, req, res, next) {
  res.statusCode = err.status ?? 500;
  res.json({
    status: "KO",
    error: err.message,
  });
}

module.exports = errorsHandler;
