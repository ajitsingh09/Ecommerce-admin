import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const BUCKETNAME = 'ajit-next-ecommerce'
export default async function handler(req, res) {
    console.log("image uploading...");
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
                secretAccessKey: process.env.S3_SECRET_ACESS_KEY
            }
        })
        client.send(new PutObjectCommand)


        return res.json("ok");
    } catch (error) {
        res.status(404).json(error);
    }
}

export const config = {
    api: { bodyParser: false },
};
