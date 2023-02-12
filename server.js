const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Tells Express to create files.
app.use(express.static('public'));
// Gets express ready to take in data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes to my route files!
require('./routes/api')(app);
require('./routes/html')(app);

//Initalizes the server
app.listen(PORT, () => {
  console.log(`Server available at localhost${PORT}`);
});
Footer