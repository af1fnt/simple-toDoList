const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('@prisma/client').PrismaClient;

const prismaClient = new prisma();

const register = async (req, res) => {
  const { email, password } = req.body;


  const userExists = await prismaClient.user.findUnique({
    where: { email }
  });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }


  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });

  return res.status(201).json({ message: 'User created successfully', user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Cek apakah email ada
  const user = await prismaClient.user.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Cek password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Buat JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ message: 'Login successful', token });
};

module.exports = {
  register,
  login
};
