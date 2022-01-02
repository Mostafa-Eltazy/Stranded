import axios from "axios";
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/posts`;

export default {
  getHomePageData: async () => {
    const response = await axios.get(`${REACT_APP_API_BASEURL}/`);
    return response.data;
  },
};
