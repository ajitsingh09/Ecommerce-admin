import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { isAdminRequest } from "./auth/[...nextauth]";
const BUCKETNAME = "ajit-next-ecommerce-new";
export default async function handler(req, res) {
  await isAdminRequest(req, res);
  let form = new multiparty.Form();
  try {
    let { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACESS_KEY,
      },
    });
    let links = [];
    for (let file of files.file) {
      let ext = file.originalFilename.split(".").pop();
      let newfilename =
        file.originalFilename.split(".")[0] + Date.now() + "." + ext;

      await client.send(
        new PutObjectCommand({
          Bucket: BUCKETNAME,
          Key: newfilename,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path),
        })
      );
      const link = `https://${BUCKETNAME}.s3.amazonaws.com/${newfilename}`;
      links.push(link);
    }

    return res.json({ links });
  } catch (error) {
    res.status(404).json(error);
  }
}

export const config = {
  api: { bodyParser: false },
};
