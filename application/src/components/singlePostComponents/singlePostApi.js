import axios from "axios";
const REACT_APP_API_BASEURL = `${process.env.REACT_APP_API_BASEURL}/posts`;


  const postSingleEntryData = async (entryData) => {
    console.log("here")
    const data = new FormData();
    data.append("title", entryData.title);
    data.append("content", entryData.content);
    data.append("date", entryData.date);
    data.append("author_id", entryData.author_id);
    axios({
      method: "post",
      url: `${REACT_APP_API_BASEURL}/add`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
}

export default postSingleEntryData;
