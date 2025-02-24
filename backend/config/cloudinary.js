import { v2 as cloudinadry} from "cloudinary";

const connectCloudinary = async () => {
    cloudinadry.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}


export default connectCloudinary;