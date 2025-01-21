const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./firebase');

const app = express();
app.use(bodyParser.json());

app.post('/api/verify-token', async (req, res) => {
  const idToken = req.headers.authorization.split(' ')[1]; // Assuming 'Bearer <token>'

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Fetch the user data from the database (use your database logic here)
    const userRecord = await admin.auth().getUser(uid);

    if (userRecord) {
      // User exists, return success
      res.status(200).json({ success: true, message: 'User verified', user: userRecord });
    } else {
      // If user does not exist, you can create or handle accordingly
      // For example, insert user data into the database
      // Then return success
      res.status(200).json({ success: true, message: 'User data added' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
