import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {  ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function SubCategoryDetails() {
  const { id } = useParams();

  function getSpecificSubCategory() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
    );
  }

  const { data, isLoading, isRefetching } = useQuery(
    "allSubCategories",
    getSpecificSubCategory,
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

  return (
    <>
      <Helmet>
        <title>{ data.data.data.name}</title>
      </Helmet>
      <div className="container py-5">
        <h2>{data.data.data.name} Section :</h2>

        <h2 className="text-center py-5">No Results Found</h2>
      </div>
    </>
  );
}
