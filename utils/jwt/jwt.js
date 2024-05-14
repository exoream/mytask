const jwt = require("jsonwebtoken");
// const { expressjwt: jwt } = require("express-jwt");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.JWTSECRET;

// Fungsi untuk membuat token
function createToken(id, role) {
    const token = jwt.sign(
        { id, role, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 5) }, // Expired in 5 hours
        secretKey,
        { algorithm: 'HS256' }
    );
    return token;
}

// Fungsi untuk mengekstrak informasi dari token
function extractToken(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1]

  const decoded = jwt.verify(token, secretKey);
  const id = decoded.id;
  const role = decoded.role;
  console.log('Decoded Token:', decoded);
  console.log('ID:', id);
  console.log('Role:', role);
  return { id, role };
}

function jwtMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log('Authorization Header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1]
    console.log('Token:', token);

    if (!token) return res.sendStatus(401)
  
    jwt.verify(token, secretKey, (err, user) => {
      console.log('JWT Verification Error:', err ? err.message : 'Unknown error');
      console.log('Secret Key:', secretKey);
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}

// Middleware untuk JWT
// function jwtMiddleware() {
//   return jwt({
//     secret: secretKey,
//     algorithms: ["HS256"],
//   });
// }

module.exports = { createToken, jwtMiddleware, extractToken };
