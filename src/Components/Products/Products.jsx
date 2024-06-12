import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import {
  addToWishlistFun,
  delFromWishlistFun,
  getAllWishlistFun,
} from "../Redux/wishlistSlice";
import { useDispatch } from "react-redux";
import $ from "jquery";
import { Helmet } from "react-helmet";

export default function Products() {
  const dispatch = useDispatch();

  const location = useLocation();

  const [allProducts, setAllProducts] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const [inputWords, setInputWords] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  async function getAllProducts(page = 1) {
    window.scrollTo(0, 0);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );

    let res = await dispatch(getAllWishlistFun());

    for (let x = 0; x < res.payload?.data.length; x++) {
      for (let i = 0; i < data.data.length; i++) {
        if (res.payload.data[x].id === data.data[i].id) {
          data.data[i].wishlistColor = "red";
        }
      }
    }
    setPageLoading(false);
    setAllProducts(data.data);
  }

  function pagination(idAttr) {
    setSearchList([]);
    setInputWords("");
    const pageNum = $(`#${idAttr}`).text();

    if (!$(`#${idAttr}`).hasClass("pageActive") && pageNum === "1") {
      setPageLoading(true);
      setPageNum(1);

      getAllProducts(pageNum);
    } else if (!$(`#${idAttr}`).hasClass("pageActive") && pageNum === "2") {
      setPageLoading(true);
      setPageNum(2);

      getAllProducts(pageNum);
    }
  }

  // const { isLoading, data } = useQuery("allProducts", getAllProducts,  {
  //   refetchOnMount: false,
  // });

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
    if ($(`#icon${id}`).attr("color") === "red") {
      const res = await dispatch(delFromWishlistFun(id));

      if (res.payload.status === "success") {
        const newProductList = allProducts.map(function (product) {
          if (product.id === id) {
            product.wishlistColor = "black";
          }
          return product;
        });
        setAllProducts(newProductList);
      }
    } else {
      const res = await dispatch(addToWishlistFun(id));
      if (res.payload.status === "success") {
        const newProductList = allProducts.map(function (product) {
          if (product.id === id) {
            product.wishlistColor = "red";
          }
          return product;
        });

        setAllProducts(newProductList);
      }
    }
  }

  function handleSearchField() {
    setInputWords($(`#searchField`).val());
    let searchIdentical = [];
    for (let i = 0; i < allProducts.length; i++) {
      if (
        allProducts[i].title
          .toLowerCase()
          .includes($(`#searchField`).val().toLowerCase())
      ) {
        searchIdentical.push(allProducts[i]);
      }
    }

    setSearchList(searchIdentical);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  if (allProducts === null || pageLoading) {
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
      {location.pathname === "/home" || location.pathname === "/" ? (
        <Helmet>
          <title>Home</title>
        </Helmet>
      ) : (
        <Helmet>
          <title>Products</title>
        </Helmet>
      )}
      <div className="container py-5">
        <div className="row g-4">
          <div>
            <input
              type="text"
              placeholder="Search By Name"
              className="form-control"
              id="searchField"
              onInput={() => handleSearchField()}
            />
            {inputWords.length > 0 && searchList.length > 0 ? (
              <span className="d-inline-block text-end w-100 py-2">
                {" "}
                {searchList.length} results for "{" "}
                <span className="text-danger fw-semibold">{inputWords}</span> "
              </span>
            ) : (
              ""
            )}
          </div>

          {inputWords.length > 0 ? (
            searchList.length > 0 ? (
              searchList.map((product, idx) => {
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
                            color={product.wishlistColor}
                            style={{
                              color:
                                product.wishlistColor !== undefined
                                  ? product.wishlistColor
                                  : "black",
                            }}
                            onClick={() => addOrRemoveWishlist(product.id)}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2 className="text-center py-5">
                  No results for {inputWords}
                </h2>
              </div>
            )
          ) : (
            allProducts.map((product, idx) => {
              return (
                <div className=" col-sm-6 col-md-4 col-lg-3 col-xl-2" key={idx}>
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
                          color={product.wishlistColor}
                          style={{
                            color:
                              product.wishlistColor !== undefined
                                ? product.wishlistColor
                                : "black",
                          }}
                          onClick={() => addOrRemoveWishlist(product.id)}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <nav aria-label="Page navigation example ">
          <ul className="pagination  d-flex justify-content-center pt-5">
            <li className="page-item cursor-pointer pageParent">
              <span
                className={`page-link ${pageNum === 1 ? "pageActive" : ""}`}
                id="page-one"
                onClick={() => pagination("page-one")}
              >
                1
              </span>
            </li>
            <li className="page-item cursor-pointer pageParent">
              <span
                className={`page-link ${pageNum === 2 ? "pageActive" : ""} `}
                id="page-two"
                onClick={() => pagination("page-two")}
              >
                2
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
