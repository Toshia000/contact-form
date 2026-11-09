import express from 'express';

const app = express();

const PORT = 3002;

const contacts = [];

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contact-form.html`);
});

app.post('/submit-form', (req, res) => {
  const contact = req.body;
  contact.timestamp = new Date();
  contacts.push(contact);
  console.log(contact);

  res.sendFile(`${import.meta.dirname}/views/form-confirmation.html`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
