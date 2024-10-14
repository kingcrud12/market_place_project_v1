import express from 'express';
import upload from '../../start/upload'; // Importer le middleware multer

const uploadRouter = express.Router();

// Route pour uploader un fichier
uploadRouter.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé.' });
  }
  res.json({ message: 'Fichier téléchargé avec succès', file: req.file });
});

export default uploadRouter;
