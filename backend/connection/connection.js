const mongoose = require('mongoose');

// then go make connection with database
const connection = async () => {
    try {
        await mongoose
        .connect('mongodb+srv://imanaswipatil:manaswiPatil12345@cluster0.zzlqseh.mongodb.net/contact')
        .then(() => {
            console.log('Database connected');
        },
        (error) => {
            console.log(error);
        });
       
    } catch (error) {
        console.log(error);
    }
};

connection();

// then go application.js and add some one line