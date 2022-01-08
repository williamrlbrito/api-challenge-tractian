import path from "path";
import multer, { StorageEngine } from "multer";
import { v4 } from "uuid";

const tempFolder = path.resolve(__dirname, "..", "..", "temp");

interface IUpload {
  driver: "s3" | "disk";
  tempFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const upload: IUpload = {
  driver: process.env.STORAGE_DRIVER,
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, "uploads"),
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = v4();
        const extname = path.extname(file.originalname);
        const fileName = `${fileHash}-file${extname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUpload;

const buildUrl = (fileName: string | null) => {
  if (!fileName) {
    return null;
  }

  switch (upload.driver) {
    case "disk":
      return `${process.env.APP_API_URL}/files/${fileName}`;
    case "s3":
      return `https://${upload.config.aws.bucket}.s3.us-east-2.amazonaws.com/${fileName}`;
    default:
      return null;
  }
};

export { upload, buildUrl };
