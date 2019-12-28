const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports.isEmpty = isEmpty;
/*-------------------------------------------------------------------------------------------------------*/
const putError = value => {
  const error = {};
  error.custom_message = value;
  return error;
};

module.exports.putError = putError;
/*-------------------------------------------------------------------------------------------------------*/
const checkError = error => {
  if (isEmpty(error.custom_message)) {
    error = {};
    error.custom_message = "something went wrong";
  }
  return error;
};

module.exports.checkError = checkError;
/*-------------------------------------------------------------------------------------------------------*/
const slugify = require("slugify");
const fs = require("fs");
const Jimp = require("jimp");

const sizes = {
  thumbnail: [150, 150],
  medium: [300, 300],
  large: [1024, 1024]
};

const fileUpload = async (upload, uploadPath) => {
  let { filename, mimetype, encoding, createReadStream } = await upload;
  let stream = createReadStream();

  filename = slugify(filename, { lower: true, replacement: "-" });
  filename = Date.now() + "-" + filename;
  let path = "." + uploadPath + filename;

  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))

      .on("finish", () => {
        resolve({
          filename,
          path
        });
      })
  );
};
module.exports.fileUpload = fileUpload;
/*----------------------------------------------------------------------------------------------------------------------- */

const fielUnlink = imgObject => {
  for (let i in imgObject) {
    fs.unlink("." + imgObject[i], function(err) {
      if (err) console.log(err);
    });
  }
};

module.exports.fielUnlink = fielUnlink;
