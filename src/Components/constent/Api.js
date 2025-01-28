import { baseUrl } from "./BaseUrl";


// ================auth api ===============

export const registerApi = baseUrl + "/auth/register";
export const loginApi = baseUrl + "/auth/login";
export const forgotPasswordApi = baseUrl + "/auth/forgot-password";
export const isEmailExistApi = baseUrl + "/auth/is-email-exists";
export const changePasswordApi = baseUrl + "/auth/change-password";


// ================auth api ===============
export const getFaqApi = baseUrl + "/faqs/get-faqs";

export const addFaqApi = baseUrl + "/faqs/get-faqs";
export const deleteFaqApi = baseUrl + "/faqs/get-faqs";
export const updateFaqApi = baseUrl + "/faqs/get-faqs";
export const updateFaqStatusApi = baseUrl + "/faqs/get-faqs";

// ===============contact us=======================
export const addContactUsApi = baseUrl + "/contact/contact-us";

// ===============contact us=======================

// ===============kyc=======================
export const submitKycApi = baseUrl + "/auth/submit-kyc";

// ===============kyc=======================


// ==============uploaded image url ==============
export const uploadImageApi = baseUrl + "/upload/upload";




