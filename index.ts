import express, { Request, Response } from 'express';
import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';

const upload = multer();

const app = express();

const mimetype = [
  'image/png'
];

app.post('/', upload.single('avatar'), async (req: Request, res: Response) => {
  try {
    const file: Express.Multer.File | undefined | any = req.file;

    const type = await fileTypeFromBuffer(file.buffer);

    if (!type) {
      return res.send('Upload failed');
    }
    if (!mimetype.includes(type.mime)) {
      return res.send('Upload failed');
    }

    // Logic code ...
    // Upload to S3 or cloudinary...
    return res.send('Upload successful');
  } catch (error) {
    return res.send('Upload failed');
  }
});

app.listen(3000, () => console.log('App runing port 3000'));
