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

// ===============group =======================
export const createGroupApi = baseUrl + "/group/create-group";
export const getAllGroupApi = baseUrl + "/group/get-all-groups";
export const searchQueryGroupApi = baseUrl + "/group/query-group";
export const updateGroupApi = baseUrl + "/group/update-group";
export const getGroupByIdApi = baseUrl + "/group/get-group-by-id";
export const getGroupAnalyticsApi = baseUrl + "/group/groups-analytics";
export const myGroupApi = baseUrl + "/group/my-groups";
export const getGroupDetailsByIdApi = baseUrl + "/group/get-group-by-id";
export const isGroupUniqueApi = baseUrl + "/group/is-group-unique"
export const groupManagementApi = baseUrl + "/group/get-group-management-data"
export const inviteGroupApi = baseUrl + "/group/invite-member"

// ===============group =======================

// ================== user profile ======================

export const getUserProfileApi = baseUrl + "/user/get-user-detail";
export const updateUserProfileApi = baseUrl + "/user/user-update";


