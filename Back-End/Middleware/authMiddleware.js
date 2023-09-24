const verify = (req, res, next) => {
  try {
    const header_data = req.headers['authorization']
    if (typeof header_data === 'undefined') {
      res.status(404).json({ success: false, message: 'token not found' })
    } else {
      const token = header_data.split(' ')[1]
      req.token = token
      next()
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Token error', error: error })
  }
}
module.exports = verify
