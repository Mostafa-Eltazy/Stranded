import axios from "axios";
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/posts`;

export default {
  getHomePageData: async () => {
    const page = 1;
    const limit = 3;
    const response = await axios.get(`${REACT_APP_API_BASEURL}/${page}?limit=${3}`,{ limit:3 });
    return response.data;
  },
};
