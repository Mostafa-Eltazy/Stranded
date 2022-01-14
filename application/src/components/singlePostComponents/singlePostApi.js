import axios from "axios";
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/posts`;


  const postSingleEntryData = async (entryData) => {
    
    const data = new FormData();
    data.append("title", entryData.title);
    data.append("content", entryData.content);
    data.append("date", entryData.date);
    data.append("author_id", entryData.author_id);
    return axios({
      method: "post",
      url: `${REACT_APP_API_BASEURL}/add`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
}

export default postSingleEntryData;
