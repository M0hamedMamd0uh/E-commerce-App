import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FallingLines, ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./../../Context/CartContext";
import toast from "react-hot-toast";
import {
  addToWishlistFun,
  delFromWishlistFun,
  getAllWishlistFun,
} from "../Redux/wishlistSlice";
import { useDispatch } from "react-redux";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [color, setColor] = useState(false);

  async function wishlistIocnColor() {
    let res = await dispatch(getAllWishlistFun());

    for (let i = 0; i < res.payload?.data.length; i++) {
      if (id === res.payload.data[i].id) {
        setColor(true);
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    wishlistIocnColor();
  }, []);

  const { addProductToCart } = useContext(CartContext);
  const [dataIsLoading, setDataIsLoading] = useState(false);

  async function getProduct() {
    setDataIsLoading(true);
    const res = await addProductToCart(id);
    if (res?.status === "success") {
      toast.success(res.message);
    } else {
      toast.error("An error occurred while adding the product");
    }
    setDataIsLoading(false);
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  async function addOrRemoveWishlist(id) {
    if (color === true) {
      const x = await dispatch(delFromWishlistFun(id));

      if (x.payload.status === "success") {
        setColor(false);
      }
    } else {
      const x = await dispatch(addToWishlistFun(id));
      if (x.payload.status === "success") {
        setColor(true);
      }
    }
  }

  const { data, isLoading, isRefetching } = useQuery(
    "ProductDetails",
    getProductDetails,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || isRefetching) {
    return (
      <div className="vh-100  d-flex justify-content-center align-items-center">
        <ThreeCircles
          height="70"
          width="70"
          color="#565656"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-md-3">
            <figure>
              <OwlCarousel className="owl-theme" loop margin={10} items={1}>
                {data.data.data.images.map((image, idx) => {
                  return (
                    <div className="item" key={idx}>
                      <img
                        src={image}
                        className="w-100"
                        alt={data.data.data.title}
                      />
                    </div>
                  );
                })}
              </OwlCarousel>
            </figure>
          </div>
          <div className="col-md-9">
            <Helmet>
              <title>{data.data.data.title}</title>
            </Helmet>
            <h1>{data.data.data.title}</h1>
            <p className="text-muted px-2">{data.data.data.description}</p>
            <Link to={`/categoryDetails/${data.data.data.category._id}`}>
              <p className="text-main">{data.data.data.category.name}</p>
            </Link>

            <p>{data.data.data.price} EGP</p>
            <div className="row">
              <div className="col-10 ">
                <button
                  onClick={getProduct}
                  type="button"
                  className="btn btnHover bg-main w-100 text-white "
                >
                  {dataIsLoading ? (
                    <>
                      <FallingLines
                        color="#fff"
                        width="30"
                        visible={true}
                        ariaLabel="falling-lines-loading"
                      />
                    </>
                  ) : (
                    "+ add to cart"
                  )}
                </button>
              </div>

              <div className="col-2  text-center">
                <span className="btn fav-icon ">
                  <i
                    className="fa-solid fa-heart"
                    id={`icon${id}`}
                    style={{
                      color: color ? "red" : "black",
                    }}
                    onClick={() => addOrRemoveWishlist(id)}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
