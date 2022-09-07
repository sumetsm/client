import axios from "axios";

export const createPerson = async (formData, authtoken,setUploadPerscenTage) => {
  return await axios.post(`${process.env.REACT_APP_API}/person`, formData, {
    headers: {

      authtoken,
    },
    onUploadProgress:progressEvent =>{
      setUploadPerscenTage(parseInt(Math.round((progressEvent.loaded * 100)/progressEvent.total)))
    }
  });
};

export const getPerson = async authtoken => {
  return await axios.get(`${process.env.REACT_APP_API}/person`, {
    headers: {
      authtoken,
    },
  });
};
export const readPerson = async (id,authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/person/${id}`, {
    headers: {
      authtoken,
    },
  });
};
export const removePerson = async (id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/person/${id}`, {
    headers: {
      authtoken,
    },
  });
};
export const updatePerson = async (name, id, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/person/${id}`, name, {
    headers: {
      authtoken,
    },
  });
};
