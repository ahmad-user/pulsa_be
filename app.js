const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./config/database.js');
const router = require('./routes/index.js');
const tableUser = require('./models/UserModels.js');
const tableBanner = require('./models/BannerModels.js');
const tableTransaksi = require('./models/TransaksiModels.js');
const tableService = require('./models/ServiceModels.js');

dotenv.config();

const app = express();

async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log('Database Connected!');
        await tableUser.sync();
        await tableBanner.sync();
        await tableTransaksi.sync();
        await tableService.sync();
    } catch (error) {
        console.error(error);
    }
}

// Panggil fungsi async untuk menginisialisasi database
initializeDatabase();

app.use(cors({
    credentials: true, 
    origin: `http://localhost:${process.env.APP_PORT || 3000}`
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(5000, () => console.log('Server running at port 5000'));
