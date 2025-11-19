// middleware/validateStudent.js
module.exports = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send(`
      <h3 style="color:red;text-align:center;margin-top:100px">
        Error: Name and Email are required!
      </h3>
      <p style="text-align:center"><a href="/students">Go Back</a></p>
    `);
  }

  if (!email.includes('@')) {
    return res.status(400).send(`
      <h3 style="color:red;text-align:center;margin-top:100px">
        Error: Please enter a valid email!
      </h3>
      <p style="text-align:center"><a href="/students">Go Back</a></p>
    `);
  }

  next();
};