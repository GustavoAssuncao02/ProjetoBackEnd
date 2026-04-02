module.exports = {
  secret: process.env.JWT_SECRET || 'my_super_secret_key',
  expiresIn: '1d'
}