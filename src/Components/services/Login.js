import { loginApi, registerApi,forgotPasswordApi,isEmailExistApi } from "../constent/Api";
import * as opsService from "./Ops";
import config from "../constent/Config";

export const loginHandle = async (data) => {

  let result = await opsService.postdata(
    loginApi, data
  );
 
  return result;
};

export const register = async (data) => {
  let result = await opsService.postdata(
    registerApi, data
  );
  return result;
};


export const forgotPassword=async(data)=>{
  let result = await opsService.postdata(forgotPasswordApi, data);
  return result;
}

export const isEmailExist = async(data)=>{
  let result = await opsService.postdata(isEmailExistApi, data);
  return result;
}
