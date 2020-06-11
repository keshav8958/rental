const express = require("express");
const router = express.Router();

// Amazon
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const config = require("config");

AWS.config.update({
  accessKeyId: "AKIAIJ7BZUZP4ZFKQIWA",
  secretAccessKey: "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",
});

AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: "imageuploadonline",
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

router.post("/", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      let type = null;
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      type = await fileType.fromBuffer(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;

      const data = await uploadFile(buffer, fileName, type);

      return response.status(200).send(data.Location);
    } catch (error) {
      return response.status(400).json({ error: error });
    }
  });
});

module.exports = router;

// const fileName = `bucketFolder/${timestamp}-lg`;
