import multer from "multer"
import { v4 as uuidv4 } from 'uuid';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/images')
    },
    filename: function (req, file, cb) {
      console.log(file);

      const fileExtention = file.originalname.split('.').pop();
      const fileName = `post-${uuidv4()}.${fileExtention}`;
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })

export default upload