import express from "express";
const route = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Mendapatkan daftar semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar buku berhasil diambil
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
 *                   example: Daftar buku berhasil diambil
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */
 
route.get("/", getBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Menambahkan buku baru
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
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
 *                   example: Buku berhasil ditambahkan
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */

route.post("/", authMiddleware, createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Mendapatkan buku berdasarkan ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Buku ditemukan
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
 *                   example: Buku berhasil ditemukan
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Buku tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Buku tidak ditemukan
 */

route.get("/:id", getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Memperbarui buku berdasarkan ID
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui
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
 *                   example: Buku berhasil perbarui
 *       404:
 *         description: Buku tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Buku tidak ditemukan
 */;

 route.put('/:id', authMiddleware, updateBook)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Menghapus buku berdasarkan ID
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
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
 *                   example: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
*         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Buku tidak ditemukan
 */
route.delete("/:id", authMiddleware, deleteBook);

module.exports = route;
