module.exports.login = function(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      passsword:req.body.passsword}
  })
}

module.exports.register = function(req, res) {
  res.status(200).json({
    register: true
  })
}
