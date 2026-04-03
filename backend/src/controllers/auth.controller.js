const jwt = require('jsonwebtoken');

// Authentication controller: from login and JWT token generation for security verification
const users = [
  { id: 1, email: 'usuario@sg.com', password: '1234' }
];

const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ message: 'Login successful', token });
};

module.exports = { login };