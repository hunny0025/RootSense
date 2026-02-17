const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/admin');
const treeRoutes = require('./routes/trees');
const issueRoutes = require('./routes/issues');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/trees', treeRoutes);
app.use('/api/admin/issues', issueRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('RootSense Backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
