import axios from "axios";
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/users`;
const REACT_APP_API_BASEURL_AUTH = `${process.env.REACT_APP_API_BASEURL}`;



const registerNewUserData = async (entryData) => {
    const data = new FormData();
    data.append("fname", entryData.fname);
    data.append("lname", entryData.lname);
    data.append("username", entryData.username);
    data.append("email",entryData.email);
    data.append("password", entryData.password);
    data.append("file", entryData.file);
    return axios({
      method: "post",
      url: `${REACT_APP_API_BASEURL}/add`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const authinticateUser = async(authData) => {
    return axios({
      method: "post",
      url: `${REACT_APP_API_BASEURL_AUTH}/api/login`,
      data: {
        "username":authData.email,
        "password":authData.password
      },
      headers: { "Content-Type": "application/json" },
    });
  }

  export  {registerNewUserData, authinticateUser}
