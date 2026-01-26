const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log(err))

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
