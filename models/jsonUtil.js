module.exports = function() {
  // Do Something to `req' or `res'
  return function(req, res, next) {
    res.jsonSend = function(data) {
      res.json({
        err: 0,
        data: data
      })
    };

    res.jsonError = function(err) {
      res.json({
        err: 1,
        data: err
      })
    }

    return next();
  };

}
