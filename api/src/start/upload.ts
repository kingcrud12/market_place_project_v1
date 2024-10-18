import multer from 'multer';
import path from 'path';

// Détermine le répertoire de stockage des fichiers
const uploadDirectory = path.resolve(__dirname, '../../uploads'); // Chemin vers le dossier 'uploads'

// Configurer le stockage de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Le dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    // Renommer le fichier pour éviter les conflits de nom
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Vérification du type de fichier (uniquement les images)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Erreur: Seules les images sont autorisées !'));
  }
};

// Initialisation de multer avec le stockage et le filtre
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille de fichier à 5MB
  fileFilter: fileFilter,
});

export default upload;
