// import { env } from "process";

const env = process.env;
console.log("env", env.BASE_URL)
const AppConsts = {
  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'Analytics',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
  },
  //appBaseUrl: env.BASE_URL
  //appBaseUrl: "https://analyticsbackendapi.azurewebsites.net/"
  appBaseUrl: "https://localhost:7029/"
};
export default AppConsts;
