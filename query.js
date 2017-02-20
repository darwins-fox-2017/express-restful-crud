"use strict"
let db = require('./models')

function testConnection() {
  db.sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });
}

db.Todo.findAll({ include: [{model: db.User}] })
// .then(function(result) {
//   console.log(`tes pertama`)
//   result.forEach(function(result) {
//     console.log(`title: ` + `${result.title} `);
//     console.log(`email: ` + `${result.User.email} `);
//     // console.log(`nomor guru: ` + student.teacherId);
//     // console.log(`nama guru: ` + student.Teacher.name);       // hasil relasi
//     // console.log(`email guru: ` + student.Teacher.email);     // hasil relasi
//     console.log(`-------------------------`);
//   })
// })
