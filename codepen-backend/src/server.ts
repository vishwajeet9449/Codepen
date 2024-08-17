import app from './app'
import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log('Connected to Database!')
    app.listen(process.env.PORT, () =>
      console.log('Started server on port', process.env.PORT)
    )
  })
  .catch((err) => console.error('Error connecting to database!', err))
