import mongoose from 'mongoose';

export const startDB = () => {
  mongoose.connect('mongodb+srv://hoangmaph23084:xcQg2w2DpsAmosHN@cluster0.hdr5iqi.mongodb.net/')
    .then(() => {
      console.log('Connect to DB');
    })
    .catch(() => {
      console.log('Connect error');
    });
};