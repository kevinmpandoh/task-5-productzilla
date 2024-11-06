import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
const app = require("../app"); // Import app

// Model Book dan setup untuk koneksi testing
import { Book } from "../models/Book";

describe("Book Controller", () => {
  let mongoServer: MongoMemoryServer;

  const authCookie = "isAuthenticated=true"; //

  // Inisialisasi MongoDB Memory Server sebelum semua tes
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Bersihkan data setelah setiap tes
  afterEach(async () => {
    await Book.deleteMany({});
  });

  // Tutup koneksi setelah semua tes selesai
  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/login").send({
      username: "admin",
      password: "password",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "Login berhasil");
    expect(res.headers["set-cookie"]).toBeDefined(); // Memastikan cookie ter-set
  });

  it("should fail login with incorrect credentials", async () => {
    const res = await request(app).post("/api/login").send({
      username: "admin",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "username atau password salah");
  });

  // Test untuk mengambil semua buku
  it("GET /api/books - success - mendapatkan semua buku", async () => {
    // Seed data untuk test
    const book = new Book({
      title: "Test Book",
      code: "123",
      author: "Author Test",
      year: 2022,
    });
    await book.save();

    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].title).toBe("Test Book");
  });

  // Test untuk membuat buku baru
  it("POST /api/books - success - menambahkan buku baru", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Cookie", authCookie)
      .send({
        title: "New Book",
        code: "456",
        author: "New Author",
        year: 2021,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.data.title).toBe("New Book");
    expect(res.body.data.code).toBe("456");
  });

  // Test untuk validasi duplikasi code
  it("POST /api/books - fail - duplikasi kode buku", async () => {
    const book = new Book({
      title: "Book 1",
      code: "789",
      author: "Author 1",
      year: 2020,
    });
    await book.save();

    const res = await request(app)
      .post("/api/books")
      .set("Cookie", authCookie)
      .send({
        title: "Book 2",
        code: "789", // kode yang sama
        author: "Author 2",
        year: 2021,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Code already exists");
  });

  // Test untuk mendapatkan buku berdasarkan ID
  it("GET /api/books/:id - success - mendapatkan buku berdasarkan ID", async () => {
    const book = new Book({
      title: "Test Book",
      code: "321",
      author: "Author Test",
      year: 2023,
    });
    await book.save();

    const res = await request(app).get(`/api/books/${book._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.title).toBe("Test Book");
  });

  // Test jika buku tidak ditemukan berdasarkan ID
  it("GET /api/books/:id - fail - buku tidak ditemukan", async () => {
    const res = await request(app).get(`/api/books/6123abc12345678912345678`); // ID yang tidak ada
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Buku tidak ditemukan");
  });

  // Test untuk memperbarui buku
  it("PUT /api/books/:id - success - memperbarui data buku", async () => {
    const book = new Book({
      title: "Old Book",
      code: "101",
      author: "Old Author",
      year: 2019,
    });
    await book.save();

    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .set("Cookie", authCookie)
      .send({
        title: "Updated Book",
        author: "Updated Author",
        code: "102",
        year: 2020,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.title).toBe("Updated Book");
  });

  // Test untuk menghapus buku
  it("DELETE /api/books/:id - success - menghapus buku", async () => {
    const book = new Book({
      title: "Book to Delete",
      code: "202",
      author: "Author Delete",
      year: 2018,
    });
    await book.save();

    const res = await request(app)
      .delete(`/api/books/${book._id}`)
      .set("Cookie", authCookie);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("buku berhasil dihapus");
  });
});
