require('dotenv').config()
const { test } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

test('blogs can be fetched', async () => {
  await api.get('/api/blogs').expect(200)
})

after(async () => {
  await mongoose.connection.close()
})
