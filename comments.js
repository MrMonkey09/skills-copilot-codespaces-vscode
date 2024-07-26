// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a route that accepts POST requests
app.post('/comments', (req, res) => {
  // Get the comment from the request body
  const comment = req.body.comment;

  // Read the comments from the file
  fs.readFile('comments.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Append the new comment to the existing comments
    const comments = data + '\n' + comment;

    // Write the comments back to the file
    fs.writeFile('comments.txt', comments, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Comment saved!');
    });
  });

  res.send('Comment received!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});