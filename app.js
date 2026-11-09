import express from 'express';

const app = express();

const PORT = 3002;

const contacts = [];

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('contact-form');
});

app.get('/admin', (req, res) => {
  res.render('admin', { contacts });
});

app.post('/submit-form', (req, res) => {
  const contact = req.body;
  contact.timestamp = new Date();
  contacts.push(contact);
  console.log(contact);

  res.render('form-confirmation');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
