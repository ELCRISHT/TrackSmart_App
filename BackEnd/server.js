   const express = require('express');
   const bodyParser = require('body-parser');
   const path = require('path'); // Import path module
   const authRoutes = require('./routes/auth');

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(bodyParser.json());
   app.use('/api', authRoutes);

   // Serve static files from the frontend directory
   app.use(express.static(path.join(__dirname, '../frontend')));

   // Serve index.html for the root URL
   app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, '../frontend/index.html'));
   });

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   