import axios from "axios";
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/users`;


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

  export default registerNewUserData
