import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,       	// Your Digital Ocean IP
    user: process.env.DB_USER,                   	// MySQL username
    password: process.env.DB_PASSWORD, 	// MySQL password from readme.txt
    database: process.env.DB_NAME,          	// Database name
    port: process.env.DB_PORT                      	// MySQL port (default is 3306)
}).promise();

const PORT = 3002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('resume');
});

app.get('/contact-form', (req, res) => {
  res.render('contact-form');
});

app.get('/admin', async(req, res) => {
  try {
    const contacts = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');
    console.log(contacts[0]);

    res.render('admin', { contacts: contacts[0] });
  } catch(err) {
    console.error('Database error: ', err);
    res.status(500).send('Database error: ' + err.message);
  }

});

app.post('/submit-form', async(req, res) => {
  try {
    const contact = req.body;
    console.log('New contact received: ', contact);

    const sql = `INSERT INTO contacts
                 (first_name, last_name, job_title,
                  company, linkedin, email,
                  first_contact_method, other_contact_method, message,
                  mailing_list, email_format)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      contact['first-name'],
      contact['last-name'],
      contact['job-title'],
      contact['company'],
      contact['linkedin'],
      contact['email'],
      contact['first-contact-method'],
      contact['other-contact-method'],
      contact['message'],
      contact['mailing-list'],
      contact['email-format']
    ];

    const [result] = await pool.execute(sql, params);
    console.log('Contact inserted with ID:', result.insertId);
    res.render('form-confirmation', { contact: contact });
  } catch (err) {
    console.error('Error inserting contact:', err);
    res.status(500).send('Sorry, there was an error processing your contact. Please try again.');
  }
});

app.get('/db-test', async(req, res) => {
  try {
    const contacts = await pool.query('SELECT * FROM contacts');

    res.send(contacts[0]);
  } catch(err) {
    console.error('Database error: ', err);

    res.status(500).send('Database error: ' + err.message);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
