const { faker } = require('@faker-js/faker');
const crypto = require('crypto');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const count = faker.number.int({ min: 1, max: 3 });
  const messages = [];

  for (let i = 0; i < count; i++) {
    messages.push({
      id: crypto.randomUUID(),
      from: faker.internet.email().toLowerCase(),
      subject: faker.lorem.sentence({ min: 4, max: 7 }),
      body: faker.lorem.paragraph(),
      received: Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 600 })
    });
  }

  res.status(200).json({
    status: "ok",
    timestamp: Math.floor(Date.now() / 1000),
    messages: messages
  });
};

