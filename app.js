
const express = require('express');

const  mailer = require('express-mailer');

const bodyParser = require('body-Parser')


const app = express();

const port = 80;

app.use(bodyParser.json())

app.set('views',__dirname + '/views');
app.set('view engine', 'pug')


const auth = {
	user: 'c450bbf814c0d2',
	pass: 'e29b58d288d182'
}

const options = {
	from:"leawamuyu89@gmail.com",
	host:"smtp.mailtrap.io",
	port: 25,
	auth: auth,
	transportMethod: 'SMTP'

}

mailer.extend(app, options);

app.use((req, res, next) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-Width, Content-Type, Accept"

);
	next();

});

app.post('/contacts', (req, res) => {
	// const message = "This is a sample email";
	const recipient = {
		to:"d5567f0e70-424531@inbox.mailtrap.io",
		subject: req.body.subject,
		name: req.body.name,
		message: req.body.message
	}

	app.mailer.send('email', recipient, (error) => {
		console.log(error)
	});

	res.send('Node.JS Application')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));