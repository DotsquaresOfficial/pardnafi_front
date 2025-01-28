import { uploadImageApi } from "../constent/Api";
import * as opsService from "./Ops";


export const uploadImage = async (data) => {

  let result = await opsService.postdata(
    uploadImageApi, data
  );
 
  return result;
};

