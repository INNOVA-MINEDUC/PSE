import multer from "multer";
import { uploadFile, uploadFiles } from "../utils/storageService.js";

// Los archivos se reciben en memoria y se reenvían tal cual al bucketService
// (sin reprocesarlos en el backend); bucketService es el único responsable
// de cualquier conversión/optimización antes de guardarlos.
const memStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Solo se permiten imágenes"), false);
	}
};

const multerImage = multer({
	storage: memStorage,
	fileFilter: imageFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

function storageErrorResponse(res, err) {
	const status = err.status || 502;
	res.status(status).json({
		success: false,
		error: err.message || "Error al subir el archivo al servicio de almacenamiento.",
	});
}

async function sendSingleToStorage(req, res, next) {
	if (!req.file) return next();

	try {
		req.storageFile = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
		next();
	} catch (err) {
		storageErrorResponse(res, err);
	}
}

async function sendMultipleToStorage(req, res, next) {
	if (!req.files || !req.files.length) return next();

	try {
		req.storageResults = await uploadFiles(
			req.files.map((file) => ({
				buffer: file.buffer,
				filename: file.originalname,
				mimeType: file.mimetype,
			}))
		); // { uploaded: [], failed: [] }
		next();
	} catch (err) {
		storageErrorResponse(res, err);
	}
}

export const uploadNoticias = {
	single(field) {
		const multerMiddleware = multerImage.single(field);
		return (req, res, next) => {
			multerMiddleware(req, res, (err) => {
				if (err) return next(err);
				sendSingleToStorage(req, res, next);
			});
		};
	},
	array(field, maxCount) {
		const multerMiddleware = multerImage.array(field, maxCount);
		return (req, res, next) => {
			multerMiddleware(req, res, (err) => {
				if (err) return next(err);
				sendMultipleToStorage(req, res, next);
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
	storage: memStorage,
	fileFilter: pdfFilter,
	limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});

export const uploadPdf = {
	single(field) {
		const multerMiddleware = multerPdf.single(field);
		return (req, res, next) => {
			multerMiddleware(req, res, (err) => {
				if (err) return next(err);
				sendSingleToStorage(req, res, next);
			});
		};
	},
};
