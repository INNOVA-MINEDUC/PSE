import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(process.cwd(), "uploads", "noticias"));
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const name =
			path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_") +
			"_" +
			Date.now() +
			ext;
		cb(null, name);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Solo se permiten imágenes"), false);
	}
};

export const uploadNoticias = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
