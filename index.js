const nodemailer = require("nodemailer");
const express = require('express');

const app = express()

const PORT = process.env.PORT || 3000;
 
// parse application/json
app.use(express.urlencoded({extended:false}));
app.use(express.json())

async function sendEmail(email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'halloween2023test@gmail.com', // generated ethereal user
      pass: 'tdhiugsznrhsoatr', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <halloween2023test@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Te has subscrito exitoxamente", // plain text body
    html: "", // html body
  });

  nodemailer.getTestMessageUrl(info);
}

app.post('/', async (req, res) => {
  const { email } = req.body;
  await sendEmail(email);
  res.send('Correo recibido');
})

app.get('/', function (req, res) {
  res.send('Correo recibido');
})

app.listen(PORT, () => {
  console.log('Servidor en el puerto 3000');
});
