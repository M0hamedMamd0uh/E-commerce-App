import React, { useEffect } from "react";
import {  ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isLoading, data } = useQuery("allBrands", getAllBrands, {
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
        <title>Brands</title>
      </Helmet>
      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold">All Brands</h1>
        <div className="row g-4">
          {data.data.data?.map((brand, idx) => {
            return (
              <div className=" col-sm-6 col-md-4 col-lg-3" key={idx}>
                <Link to={`/brandDetails/${brand._id}`}>
                  <div className="product p-2 cursor-pointer">
                    <img
                      src={brand.image}
                      className="w-100"
                      alt={brand.image}
                    />
                    <hr />
                    <h5 className="text-center">{brand.name}</h5>
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
