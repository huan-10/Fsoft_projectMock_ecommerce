import Layout from "@/components/admin/layout";
import axios from "axios";
import * as Yup from "yup";
import styles from "../../../../styles/products.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { Form, Formik } from "formik";
import SingularSelect from "@/components/selects/SingularSelect";
import AdminInput from "@/components/inputs/adminInputs";
import MultipleSelect from "@/components/selects/MultipleSelect";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadImages } from "@/requests/upload";
import { toast } from "react-toastify";
import { validateCreateProduct } from "@/utils/validation";
import { showDialog } from "@/store/DialogSlice";
import Images from "@/components/admin/createProduct/images";
import Colors from "@/components/admin/createProduct/color";
import Style from "@/components/admin/createProduct/styles";
import Details from "@/components/admin/createProduct/clickToAdd/Details";
import Questions from "@/components/admin/createProduct/clickToAdd/Questions";
import Sizes from "@/components/admin/createProduct/clickToAdd/Size";
interface Color {
  color: string;
  image: string;
}
interface Size {
  size: string;
  qty: string;
  price: string;
}
interface Detail {
  name: string;
  value: string;
}
interface Question {
  question: string;
  answer: string;
}
interface State {
  name: string;
  description: string;
  brand: string;
  sku: string;
  discount: number;
  images: string[];
  description_images: string[];
  parent: string;
  category: string;
  subCategories: string[];
  color: Color;
  sizes: Size[];
  details: Detail[];
  questions: Question[];
  shippingFee: string;
}
const initialState: State = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};

export default function Create({ parents, categories }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!product.parent) return;
    const getParentData = async () => {
      console.log(product);
      const { data } = await axios.get(`/api/product/${product.parent}`);
      console.log(data);
      if (data) {
        setProduct({
          ...product,
          name: data.name,
          description: data.description,
          brand: data.brand,
          category: data.category,
          subCategories: data.subCategories,
          questions: [],
          details: [],
        });
      }
    };
    getParentData();
  }, [product.parent]);
  useEffect(() => {
    async function getSubs() {
      const { data } = await axios.get("/api/admin/subCategory", {
        params: {
          category: product.category,
        },
      });
      console.log(data);
      setSubs(data);
    }
    getSubs();
  }, [product.category]);
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must between 10 and 300 characters.")
      .max(300, "Product name must between 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    /*
    subCategories: Yup.array().min(
      1,
      "Please select atleast one sub Category."
    ),
   */
    sku: Yup.string().required("Please add a sku/number"),
    color: Yup.string().required("Please add a color"),
    description: Yup.string().required("Please add a description"),
  });
  const createProduct = async () => {
    let test = validateCreateProduct(product, images);
    if (test == "valid") {
      createProductHandler();
    } else {
      dispatch(
        showDialog({
          header: "Please follow our instructions.",
          msgs: test,
        })
      );
    }
  };
  let uploaded_images: never[] = [];
  let style_img = "";
  const createProductHandler = async () => {
    setLoading(true);
    if (images) {
      let temp = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = "product images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((image) => {
        formData.append("file", image);
      });
      uploaded_images = await uploadImages(formData);
    }
    if (product.color.image) {
      let temp = dataURItoBlob(product.color.image);
      let path = "product style images";
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", temp);
      let cloudinary_style_img = await uploadImages(formData);
      style_img = cloudinary_style_img[0].url;
    }
    try {
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        images: uploaded_images,
        color: {
          image: style_img,
          color: product.color.color,
        },
      });
      setLoading(false);
      toast.success(data.message);
      setProduct(initialState);
      setImages([]);
      setColorImage("");
      setDescription_images("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className={styles.header}>Create Product</div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color?.color,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            <Images
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            />
            <div className={styles.flex}>
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={styles.image_span}
                  alt=""
                />
              )}
              {product.color.color && (
                <span
                  className={styles.color_span}
                  style={{ background: `${product.color.color}` }}
                ></span>
              )}
            </div>
            <Colors
              name="color"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <Style
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <SingularSelect
              name="parent"
              value={product.parent}
              placeholder="Parent product"
              data={parents}
              header="Add to an existing product"
              handleChange={handleChange}
            />
            <SingularSelect
              name="category"
              value={product.category}
              placeholder="Category"
              data={categories}
              header="Select a Category"
              handleChange={handleChange}
              disabled={product.parent}
            />
            {product.category && (
              <MultipleSelect
                value={product.subCategories}
                data={subs}
                header="Select SubCategories"
                name="subCategories"
                disabled={product.parent}
                handleChange={handleChange}
              />
            )}
            <div className={styles.header}>Information Product</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Product name"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Description"
              name="description"
              placeholder="Product description"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Brand"
              name="brand"
              placeholder="Product brand"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Sku"
              name="sku"
              placeholder="Product sku/ number"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Discount"
              name="discount"
              placeholder="Product discount"
              onChange={handleChange}
            />
            <Sizes
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            />

            <Details
              details={product.details}
              product={product}
              setProduct={setProduct}
            />
            <Questions
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            />
            {/*
            <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />
           
       
          
            */}
            <button
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
              type="submit"
            >
              Create Product
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDb();
  const results = await Product.find().select("name subProducts").lean();
  const categories = await Category.find().lean();
  db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
