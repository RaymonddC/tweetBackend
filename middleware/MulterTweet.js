const multer = require('multer');
const fs = require('fs');

const defaultPath = 'public';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // console.log('multebosss');
    let directoryExists = fs.existsSync(`${defaultPath}/tweetImages`);
    if (!directoryExists) {
      await fs.promises.mkdir(`${defaultPath}/tweetImages`, {
        recursive: true,
      });
    }
    cb(null, `${defaultPath}/tweetImages`);
  },
  filename: (req, file, cb) => {
    cb(null, `TIMG-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'jpeg' || file.mimetype.split('/')[1] === 'png') {
    cb(null, true);
  } else {
    cb(new Error('file not supported'));
  }
};

const multerTweetImage = multer({ storage: storage, fileFilter: fileFilter });

module.exports = {
  multerTweetImage,
};
