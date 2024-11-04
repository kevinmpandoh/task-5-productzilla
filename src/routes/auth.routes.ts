import express from "express";
const { login, logout } = require("../controllers/auth.controller");

const route = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                  type: string
 *                  example: admin
 *               password:
 *                  type: string
 *                  example: password
 *     responses:
 *       200:
 *         description: User berhasil login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: login berhasil
 *       401:
 *         description: Username atau password salah
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Username atau password salah   
 */
// Login endpoint
route.post("/login", login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Logout berhasil
 */

// Logout endpoint
route.post("/logout", logout);

module.exports = route;
