import multer from "multer";
import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

// Primero se recibe la imagen en memoria, luego sharp la convierte a WebP y la guarda.
const memStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Solo se permiten imágenes"), false);
	}
};

const multerUpload = multer({
	storage: memStorage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

async function processToWebp(req, res, next) {
	if (!req.file) return next();

	const uploadsDir = path.join(process.cwd(), "uploads", "noticias");
	await fs.mkdir(uploadsDir, { recursive: true });

	const baseName = path.basename(req.file.originalname, path.extname(req.file.originalname))
		.replace(/[^a-zA-Z0-9_-]/g, "_");
	const fileName = `${baseName}_${Date.now()}.webp`;
	const outPath = path.join(uploadsDir, fileName);

	await sharp(req.file.buffer)
		.resize({ width: 1280, withoutEnlargement: true }) // máx 1280px ancho, sin agrandar
		.webp({ quality: 82 })
		.toFile(outPath);

	// Exponemos la misma interfaz que multer diskStorage para compatibilidad
	req.file.filename = fileName;
	req.file.path = outPath;
	req.file.destination = uploadsDir;
	req.file.mimetype = "image/webp";

	next();
}

export const uploadNoticias = {
	single(field) {
		const multerMiddleware = multerUpload.single(field);
		return (req, res, next) => {
			multerMiddleware(req, res, (err) => {
				if (err) return next(err);
				processToWebp(req, res, next);
			});
		};
	},
};

const pdfFilter = (req, file, cb) => {
	if (file.mimetype === "application/pdf") {
		cb(null, true);
	} else {
		cb(new Error("Solo se permiten archivos PDF"), false);
	}
};

const multerPdf = multer({
	storage: multer.diskStorage({
		destination: async (req, file, cb) => {
			const dir = path.join(process.cwd(), "uploads", "docs");
			await fs.mkdir(dir, { recursive: true });
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			const base = path.basename(file.originalname, ".pdf").replace(/[^a-zA-Z0-9_-]/g, "_");
			cb(null, `${base}_${Date.now()}.pdf`);
		},
	}),
	fileFilter: pdfFilter,
	limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});

export const uploadPdf = multerPdf;
