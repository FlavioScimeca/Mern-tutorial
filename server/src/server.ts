import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => {
    console.log('Mongoose connected');

    app.listen(Number(port), function () {
      console.log('Server is running on port: ' + port);
    });
  })
  .catch((err) => console.log(err));
