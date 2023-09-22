import logger from "../../tools/logger";
import {v4} from "uuid";
import path from "path";

class FileService {
    async saveFile(file: any){
        try{
            const fileName = v4() + '.pdf';
            await file.mv(path.resolve(__dirname, '..', 'static', fileName))
            return fileName;
        } catch (e) {
           logger.error(e)
        }
    }
}

export default new FileService()