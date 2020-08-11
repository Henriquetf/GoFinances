import { randomBytes } from 'crypto';
import { resolve } from 'path';

import { Options, diskStorage } from 'multer';

const storage = diskStorage({
  destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  filename(request, file, callback) {
    const newFilename = randomBytes(32).toString('hex');

    callback(null, newFilename);
  },
});

const uploadConfig: Options = {
  storage,
};

export default uploadConfig;
