import axios from "axios";

export const saveCart = async (cart: any) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
    });
    // console.log(data);
    return data;
  } catch (error) {
    return (error as any).response.data.message;
  }
};

export const saveAddress = async (address: any, userId: string) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
      userId,
    });
    return data;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
export const changeActiveAddress = async (id: any) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      id,
    });
    return data;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
export const deleteAddress = async (id: any) => {
  try {
    const { data } = await axios.delete("/api/user/deleteAddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
export const applyCoupon = async (coupon: string) => {
  try {
    const { data } = await axios.post("/api/user/applyCoupon", {
      coupon,
    });
    return data;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
