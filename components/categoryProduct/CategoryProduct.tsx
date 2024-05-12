import { useState, useEffect } from "react";
import dataProducts from "../../data/products.json";
import Link from "next/link";

interface Product {
  _id: { $oid: string };
  Shipping: boolean;
  color: string;
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: { $oid: string };
  subCategories: { $oid: string }[];
  details: ProductDetail[];
  questions: any[];
  subProducts: SubProduct[];
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
  numReviews: number;
  rating: number;
  refundPolicy: string;
  reviews: ProductReview[];
  shipping: string;
}

interface ProductDetail {
  name: string;
  value: string;
  _id: { $oid: string };
}

interface SubProduct {
  sku: string;
  discount: number;
  images: { url: string; public_url: string }[];
  description_images: any[];
  color: {
    color: string;
    image: string;
  };
  sizes: ProductSize[];
  _id: { $oid: string };
}

interface ProductSize {
  size: string;
  qty: number;
  price: number;
  _id: { $oid: string };
}

interface ProductReview {
  reviewBy: { $oid: string };
  rating: number;
  review: string;
  size: string;
  style: { color: string; image: string };
  fit: string;
  images: { url: string; public_url: string }[];
  _id: { $oid: string };
  createdAt: { $date: string };
  updatedAt: { $date: string };
}

const CategoryProduct = ({ slug }: { slug: string }) => {
  const dataSlug = dataProducts.filter((data) => data.slug === slug);
  const [data, setData] = useState<Product[]>(dataSlug);
  const [data2, setData2] = useState<Product[]>(dataSlug);
  const [valueMin, setValueMin] = useState("");
  const [valueMax, setValueMax] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [idImages, setIdImages] = useState();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [toggle, setToggle] = useState(window.innerWidth > 574);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedColor, setSelectedColor] = useState();

  useEffect(() => {
    const filteredData = dataSlug.filter((product) => {
      const price = product.subProducts[0].sizes[0].price;
      return (
        valueMin === "" ||
        valueMax === "" ||
        (price >= valueMin && price <= valueMax)
      );
    });
    setData(filteredData);
  }, [valueMin, valueMax]);

  const handleThumbnailChange = (imageUrl, id) => {
    setSelectedImage(imageUrl);
    setIdImages(id);
  };

  const dataCategories = [
    "Women's Fashion",
    "Men's Fashion",
    "Electronics",
    "Jewlery & Watches",
    "Beauty, Health & Hair",
    "Shoes,Sneakers,Heels",
    "Accessories",
    "Sports & Entertainment",
    "Gifts & Crafts",
  ];

  const dataColor = [
    "#fff",
    "#eb34eb",
    "#333",
    "red",
    "green",
    "yellow",
    "orange",
    "pink",
    "#3deb34",
    "#34ebe8",
  ];

  useEffect(() => {
    const handleResize = () => {
      setToggle(window.innerWidth > 574);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setIsChecked(!isChecked);
      setData(data2);
    } else {
      const test = data.filter((data) => data.Shipping === true);
      setData(test);
      setIsChecked(!isChecked);
    }
  };

  const handleCategory = (category) => {
    const newArr = dataProducts.filter((data) => data.slug === category);

    setData(newArr);
    setData2(newArr);
    setSelectedColor("");
  };
  const handleColor = (color) => {
    setData(data2);
    const filteredData = data2.filter((item) => item.color === color);
    setData(filteredData);
    setSelectedColor(color);
    setValueMin("");
    setValueMax("");
  };

  return (
    <div className="m-5 mt-2">
      <p className="mb-5 mt-3 " style={{ fontWeight: "500", fontSize: "18px" }}>
        <Link legacyBehavior href={"/"}>
          <a style={{ color: "black", textDecoration: "none" }}>Home</a>
        </Link>
        <Link legacyBehavior href={"/browse"}>
          <a style={{ color: "black", textDecoration: "none" }}> /Browse/</a>
        </Link>

        {slug}
      </p>
      <div className="row">
        <div
          className="col-lg-2 col-md-3 col-sm-4 pr"
          style={{
            borderRight: toggle ? "3px solid #ced4da" : "",
            paddingRight: "20px",
          }}
        >
          <div className="d-flex">
            <p>Price:</p>
            <input
              onChange={(e) => setValueMin(e.target.value)}
              style={{ width: "30%", height: "30px", marginLeft: "5px" }}
              type="number"
              name=""
              id=""
              placeholder="min"
            />
            <input
              onChange={(e) => setValueMax(e.target.value)}
              style={{ width: "30%", height: "30px", marginLeft: "5px" }}
              type="number"
              name=""
              id=""
              placeholder="max"
            />
          </div>

          <div
            className="d-flex align-items-center"
            style={{ margin: " 20px 0" }}
          >
            <input
              style={{ cursor: "pointer" }}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <div style={{ marginLeft: "7px" }}>
              <span>Free Shipping</span>
            </div>
          </div>
          <div
            style={{ marginBottom: "-10px" }}
            className="d-flex justify-content-between mt-4"
          >
            <div>
              <p style={{ fontWeight: "500" }}>Category</p>
            </div>
            <div>
              <i className="fa-solid fa-minus"></i>
            </div>
          </div>

          {dataCategories &&
            dataCategories.map((category, index) => (
              <div key={index} className="d-flex justify-content-between">
                <div
                  onClick={() => handleCategory(category)}
                  className="d-flex align-items-center"
                >
                  <div style={{ cursor: "pointer" }}>
                    <input
                      style={{ marginRight: "10px" }}
                      type="radio"
                      id={`category${index}`}
                      checked={selectedCompany === category}
                      onChange={() => setSelectedCompany(category)}
                    />
                    <label
                      style={{ cursor: "pointer" }}
                      htmlFor={`category${index}`}
                    >
                      {category}
                    </label>
                  </div>
                </div>
                <div></div>
              </div>
            ))}
          <div>
            <div
              style={{ marginBottom: "-10px" }}
              className="d-flex justify-content-between mt-4"
            >
              <div>
                <p style={{ fontWeight: "500" }}>Size</p>
              </div>
              <div>
                <i className="fa-solid fa-minus"></i>
              </div>
            </div>
            <div className="d-flex  align-items-center">
              <div className="d-flex align-items-center w-50">
                <input style={{ cursor: "pointer" }} type="checkbox" />
                <p className="mb-0 ms-2 ">S</p>
              </div>
              <div className="d-flex align-items-center">
                <input style={{ cursor: "pointer" }} type="checkbox" />
                <p className="mb-0 ms-2">M</p>
              </div>
              <div></div>
            </div>
            <div className="d-flex  align-items-center">
              <div className="d-flex align-items-center w-50">
                <input style={{ cursor: "pointer" }} type="checkbox" />
                <p className="mb-0 ms-2">L</p>
              </div>
              <div className="d-flex align-items-center">
                <input style={{ cursor: "pointer" }} type="checkbox" />
                <p className="mb-0 ms-2">XL</p>
              </div>
              <div></div>
            </div>
            <div className="d-flex  align-items-center">
              <div className="d-flex align-items-center w-50">
                <input style={{ cursor: "pointer" }} type="checkbox" />
                <p className="mb-0 ms-2">XXL</p>
              </div>
              <div className="d-flex align-items-center">
                <input style={{ cursor: "pointer" }} type="checkbox" />
                <p className="mb-0 ms-2">3XL</p>
              </div>
              <div></div>
            </div>
          </div>

          <div
            style={{ marginBottom: "-10px" }}
            className="d-flex justify-content-between mt-4"
          >
            <div>
              <p style={{ fontWeight: "500" }}>Color</p>
            </div>
            <div>
              <i className="fa-solid fa-minus"></i>
            </div>
          </div>
          <div className="row">
            {dataColor.map((color, index) => (
              <div
                key={index}
                className="mb-3 d-flex col-sm-4 col-md-3 col-lg-2 "
              >
                <div
                  style={{
                    border:
                      selectedColor === color
                        ? "2px solid #007bff"
                        : "2px solid transparent",
                    borderRadius: "50%",
                    width: "23px",
                    height: "23px",
                  }}
                >
                  <div
                    onClick={() => handleColor(color)}
                    style={{
                      marginRight: "10px",
                      width: "20px",
                      height: "20px",
                      objectFit: "cover",
                      cursor: "pointer",
                      backgroundColor: color,
                    }}
                    className="rounded-circle p-0 border"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-10 col-md-9 col-sm-8">
          <div style={{ paddingLeft: "10px" }} className="row">
            {data.map((product) => (
              <div
                key={product._id.$oid}
                className=" col-sm-6 col-md-4 col-lg-3 col-6 mb-5"
              >
                <img
                  className="my-3"
                  width={"100%"}
                  height={"360px"}
                  src={
                    idImages === product._id.$oid
                      ? selectedImage
                      : product.subProducts[0].images[0].url
                  }
                  alt=""
                />

                {/* Tên sản phẩm */}
                <p
                  style={{
                    fontWeight: "400",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                >
                  {product.name}
                </p>

                {/* Giá */}
                <p style={{ color: "#f74d50", fontWeight: "500" }}>
                  USD {product.subProducts[0].sizes[0].price}$
                </p>

                {/* Danh sách ảnh nhỏ */}
                {product.subProducts.map((subProduct) => (
                  <img
                    key={subProduct._id.$oid}
                    style={{
                      marginRight: "10px",
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: idImages
                        ? subProduct.images[0].url === selectedImage
                          ? "2px solid #007bff"
                          : "2px solid transparent"
                        : "2px solid transparent",
                    }}
                    src={subProduct.images[0].url}
                    alt=""
                    className="rounded-circle img-thumbnail p-0"
                    onClick={() =>
                      handleThumbnailChange(
                        subProduct.images[0].url,
                        product._id.$oid
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
