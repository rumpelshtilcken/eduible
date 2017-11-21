import { cloudinaryConfig } from 'config';
// 0: bytes :48283
//   created_at: "2017-11-21T06:17:15Z"
//   etag: "6c9da833a4d21f87dc8891758cb846e0"
//   format: "png"
//   height: 431
//   original_filename: "favicon"
//   path: "v1511245035/tldzqjsf09x4mledlwvx.png"
//   placeholder: false
//   public_id: "tldzqjsf09x4mledlwvx"
//   resource_type: "image"
//   secure_url: "https://res.cloudinary.com/dsyyowxl0/image/upload/v1511245035/tldzqjsf09x4mledlwvx.png"
//   signature: "b81624cd965cba2b45ac59aab99366f006642ca7"
//   tags: ["xmas"]
//   thumbnail_url: "http://res.cloudinary.com/dsyyowxl0/image/upload/c_limit,h_60,w_90/v1511245035/tldzqjsf09x4mledlwvx.png"
//   type: "upload"
//   url: "http://res.cloudinary.com/dsyyowxl0/image/upload/v1511245035/tldzqjsf09x4mledlwvx.png"
//   version:  1511245035
//   width:  340

const Cloudinary = {
  uploadImageWidget: callback => window.cloudinary.openUploadWidget({
    cloud_name: cloudinaryConfig.cloudName,
    upload_preset: 'r6xkag6m',
    tags: ['xmas']
  },
  (error, result) => {
    if (error) return callback(error, null);
    console.log(result, result[0]);
    const { public_id } = result[0];
    return callback({ error, publicId: public_id });
  })
};

export default Cloudinary;
