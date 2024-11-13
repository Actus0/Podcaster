const express = require('express');
// const multer = require('multer');
const jwt = require('jsonwebtoken'); // Use this if you're using JWT token


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Token required' });

    jwt.verify(token, 'YOUR_SECRET_KEY', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

module.exports = authtoken;