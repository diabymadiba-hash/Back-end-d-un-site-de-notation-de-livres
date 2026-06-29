const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const BASE_URL = process.env.BASE_URL || 'https://back-end-d-un-site-de-notation-de-livres-j4ko.onrender.com';

const avg = (ratings) => ratings.reduce((acc, r) => acc + r.grade, 0) / ratings.length;

const BOOKS = [
  {
    userId: 'clc4wj5lh3gyi0ak4eq4n8syr',
    title: 'Milwaukee Mission',
    author: 'Elder Cooper',
    imageUrl: `${BASE_URL}/images/book1.webp`,
    year: 2021,
    genre: 'Policier',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'clc4wj5lh3gyi0ak4eq4n8syr', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
    ],
  },
  {
    userId: 'clbxs3tag6jkr0biul4trzbrv',
    title: 'Book for Esther',
    author: 'Alabaster',
    imageUrl: `${BASE_URL}/images/book2.webp`,
    year: 2022,
    genre: 'Paysage',
    ratings: [
      { userId: 'clbxs3tag6jkr0biul4trzbrv', grade: 4 },
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
    ],
  },
  {
    userId: 'seed-user-1',
    title: 'The Kinfolk Table',
    author: 'Nathan Williams',
    imageUrl: `${BASE_URL}/images/book3.webp`,
    year: 2022,
    genre: 'Cuisine',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
      { userId: 'seed-user-4', grade: 5 },
    ],
  },
  {
    userId: 'seed-user-1',
    title: 'Milwaukee Mission',
    author: 'Elder Cooper',
    imageUrl: `${BASE_URL}/images/book4.webp`,
    year: 2021,
    genre: 'Policier',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
      { userId: 'seed-user-4', grade: 5 },
    ],
  },
  {
    userId: 'seed-user-1',
    title: 'Book for Esther',
    author: 'Alabaster',
    imageUrl: `${BASE_URL}/images/book5.webp`,
    year: 2022,
    genre: 'Paysage',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
      { userId: 'seed-user-4', grade: 5 },
    ],
  },
  {
    userId: 'seed-user-1',
    title: 'The Kinfolk Table',
    author: 'Nathan Williams',
    imageUrl: `${BASE_URL}/images/book6.webp`,
    year: 2022,
    genre: 'Cuisine',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
      { userId: 'seed-user-4', grade: 5 },
    ],
  },
  {
    userId: 'seed-user-1',
    title: 'Milwaukee Mission',
    author: 'Elder Cooper',
    imageUrl: `${BASE_URL}/images/book7.webp`,
    year: 2021,
    genre: 'Policier',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
      { userId: 'seed-user-4', grade: 5 },
    ],
  },
  {
    userId: 'clc7s9xnh7zpt0ak4fisdwuj1',
    title: 'Book for Esther',
    author: 'Alabaster',
    imageUrl: `${BASE_URL}/images/book8.webp`,
    year: 2022,
    genre: 'Paysage',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
      { userId: 'seed-user-4', grade: 5 },
    ],
  },
  {
    userId: 'clc4wj5lh3gyi0ak4eq4n8syr',
    title: 'The Kinfolk Table',
    author: 'Nathan Williams',
    imageUrl: `${BASE_URL}/images/book9.webp`,
    year: 2022,
    genre: 'Cuisine',
    ratings: [
      { userId: 'seed-user-1', grade: 5 },
      { userId: 'seed-user-2', grade: 5 },
      { userId: 'seed-user-3', grade: 5 },
      { userId: 'clc4wj5lh3gyi0ak4eq4n8syr', grade: 1 },
    ],
  },
];

router.get('/', async (req, res) => {
  try {
    await Book.deleteMany({});
    const inserted = await Book.insertMany(
      BOOKS.map((b) => ({ ...b, averageRating: avg(b.ratings) }))
    );
    res.status(200).json({ message: `${inserted.length} livres insérés.`, books: inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
