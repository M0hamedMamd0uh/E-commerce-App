import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { delFromWishlistFun, getAllWishlistFun } from "../Redux/wishlistSlice";
import { useDispatch } from "react-redux";
import {  ThreeCircles } from "react-loader-spinner";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function WishList() {
  const [allWishlistCopy, setAllWishlistCopy] = useState(null);

  const dispatch = useDispatch();
  const { addProductToCart } = useContext(CartContext);

  async function getProduct(id) {
    const res = await addProductToCart(id);
    try {
      toast.success(res.message);
    } catch (e) {
      toast.error("An error occurred while adding the product");
    }
  }

  async function addOrRemoveWishlist(id) {
    const x = await dispatch(delFromWishlistFun(id));

    if (x.payload.status === "success") {
      getWishlist();
    }
  }

  async function getWishlist() {
    const res = await dispatch(getAllWishlistFun());
    setAllWishlistCopy(res.payload.data);
  }

  useEffect(() => {
    getWishlist();
  }, []);

  if (allWishlistCopy === null) {
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
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="container py-5">
        <div className="row">
          {allWishlistCopy.length === 0 ? (
            <div className="text-center py-5">
              <h2>Wishlist Is Empty</h2>
              <Link
                to="/products"
                className="text-main cursor-pointer fw-semibold d-inline-block "
              >
                Add Some Products
              </Link>
            </div>
          ) : (
            <>
              {allWishlistCopy?.map((product, idx) => {
                return (
                  <div
                    className=" col-sm-6 col-md-4 col-lg-3 col-xl-2"
                    key={idx}
                  >
                    <div className="product p-2 cursor-pointer ">
                      <Link
                        to={`/ProductDetails/${product.id}`}
                        title={product.title}
                      >
                        <img
                          src={product.imageCover}
                          className="w-100"
                          alt="product"
                        />
                        <h6 className="my-2 text-main">
                          {product.category.name}
                        </h6>
                        <h6 className="my-2 fw-semibold add-3dots">
                          {product.title}
                        </h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-1">{product.price} EGP</p>
                          <p className="mb-1">
                            <i className="fa-solid fa-star rating-color"></i>
                            {product.ratingsAverage}
                          </p>
                        </div>
                      </Link>

                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          onClick={() => getProduct(product.id)}
                          type="button"
                          className="btn  btnHover  bg-main w-75 text-white mt-1"
                        >
                          + add to cart
                        </button>

                        <span className="btn fav-icon ">
                          <i
                            className="fa-solid fa-heart"
                            id={`icon${product.id}`}
                            style={{
                              color: "red",
                            }}
                            onClick={() => addOrRemoveWishlist(product.id)}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
