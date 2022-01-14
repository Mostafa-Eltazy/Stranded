import axios from "axios";
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/posts`;

export default {
  postSingleEntryData: async () => {
    // const response = await axios.get(`${REACT_APP_API_BASEURL}/add`);
    try {
        await axios.post(`${REACT_APP_API_BASEURL}/posts/add`,{

          title,
          content,
          date: new Date(),
          author_id: '1'
        });
      }
      catch (err){
        console.log("failde to post the entry:",err)
      }
    return response.data;
  },
};
