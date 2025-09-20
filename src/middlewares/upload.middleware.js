// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); 
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const name = file.fieldname + "-" + Date.now() + ext;
//     cb(null, name);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);
//   if(extname && mimetype) cb(null, true);
//   else cb(new Error("Only images are allowed (jpeg, jpg, png)"));
// };

// export const uploadImages = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, 
//   fileFilter
// });
