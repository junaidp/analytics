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
  appBaseUrl: "http://87f1-206-84-134-143.ngrok.io/upload/uploadCustomers"

};
export default AppConsts;
