require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const router = require('./src/routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

// setInterval(deletCode, 60000);
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ limit: '100mb', extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Server online on http://localhost:${PORT}`);
});