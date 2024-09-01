const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./config/database.js');
const router = require('./routes');
const tableUser = require('./models/UserModels.js');
const tableBanner = require('./models/BannerModels.js');
const tableTransaksi = require('./models/TransaksiModels.js');
const tableService = require('./models/ServiceModels.js');
const userRoutes = require('./routes/users.js')

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

const PORT = process.env.APP_PORT || 3000;

app.use(cors({
    credentials: true, 
    origin: `http://localhost:${PORT}`
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
