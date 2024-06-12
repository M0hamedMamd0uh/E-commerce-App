import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function BrandDetails() {
  const { id } = useParams();

  function getBrandDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

  const { data, isLoading, isRefetching } = useQuery(
    "brandDetails",
    getBrandDetails,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  let { image, name } = data?.data.data;
  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className="container py-5">
        <h1 className="mb-5">{name} Details : </h1>
        <div className="text-center ">
          <img src={image} alt={image} className="w-25 border border-1" />
        </div>
      </div>
    </>
  );
}
