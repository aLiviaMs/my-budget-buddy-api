jest.mock('../../prisma', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn()
  }
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn()
}));
