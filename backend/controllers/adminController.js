const login = (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // In a real app, generate a JWT here. For now, we return a success flag.
        return res.status(200).json({
            success: true,
            message: 'Admin access granted',
            token: 'mock-jwt-token-12345'
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
};

const status = (req, res) => {
    // This endpoint should be protected by middleware in a real app
    res.json({
        status: 'active',
        database: 'connected',
        ai_engine: 'operational',
        timestamp: new Date()
    });
};

const logout = (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = { login, status, logout };
