/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - year
 *        - genre
 *      properties:
 *       title:
 *        type: string
 *       description: The title of the book
 *
 *
 */

// Model
import { Schema, model } from "mongoose";

interface IBook {
  title: string;
  code: string;
  author: string;
  year: number;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

export const Book = model<IBook>("Book", BookSchema);
