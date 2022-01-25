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
};

const getSingleEntryData = async (id) => {
  return axios({
    method: "get",
    url: `${REACT_APP_API_BASEURL}/${id}`,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const editSinglePostData = async(entryData)=>{
  const data = new FormData();
  data.append("post_id", entryData.post_id);
  data.append("title", entryData.title);
  data.append("content", entryData.content);
  data.append("date", entryData.editDate);
  return axios({
    method: "post",
    url: `${REACT_APP_API_BASEURL}/edit`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export { postSingleEntryData, getSingleEntryData, editSinglePostData };
