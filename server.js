const express = require('express');
const path = require('path');
const { schedule } = require('./data');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the schedule
app.get('/api/schedule', (req, res) => {
    res.json(schedule);
});

// Serve the main HTML file for any other requests (e.g., direct navigation)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
