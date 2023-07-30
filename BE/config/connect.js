import mongoose from 'mongoose';

export const startDB = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/chatApp')
    .then(() => {
      console.log('Connect to DB');
    })
    .catch(() => {
      console.log('Connect error');
    });
};