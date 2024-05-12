import axios from "axios";
export const uploadImages = async (formData: any) => {
  const { data } = await axios.post("/api/cloudinary", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return data;
};
