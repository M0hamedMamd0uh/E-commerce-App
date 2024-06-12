import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { isLoading, data } = useQuery("allCategories", getAllCategories, {
    refetchOnMount: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) {
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
        <title>Categories</title>
      </Helmet>
      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold">All Categories</h1>
        <div className="row g-4">
          {data.data.data?.map((category, idx) => {
            return (
              <div className=" col-sm-6 col-md-4 col-lg-3" key={idx}>
                <Link to={`/categoryDetails/${category._id}`}>
                  <div className="product p-2 cursor-pointer">
                    <img
                      style={{ height: "280px", objectFit: "cover" }}
                      src={category.image}
                      className="w-100"
                      alt={category.image}
                    />
                    <hr />
                    <h5 className="text-center">{category.name}</h5>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
