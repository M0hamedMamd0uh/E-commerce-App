import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { id } = useParams();

  function getAllSubCategories() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const {
    data: subcategoriesData,
    isLoading: subcategoriesLoading,
    isRefetching: subcategoriesIsRefetching,
  } = useQuery("allSubCategories", getAllSubCategories, {
    refetchOnWindowFocus: false,
  });

  function getCategoryDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  const { data, isLoading, isRefetching } = useQuery(
    "categoryDetails",
    getCategoryDetails,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (
    isLoading ||
    isRefetching ||
    subcategoriesLoading ||
    subcategoriesIsRefetching
  ) {
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
        <title>{ name}</title>
      </Helmet>
      <div className="container py-5">
        <h1 className="mb-5">{name} Details : </h1>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="">
              <img
                src={image}
                alt={image}
                className="w-100 border border-1"
                style={{ objectFit: "contain", height: "350px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-8">
            <div className="row g-4">
              <h2 className="fw-semibold">All SubCategories :</h2>
              {subcategoriesData?.data.data.length > 0 ? (
                subcategoriesData?.data.data.map((subCategory, idx) => {
                  return (
                    <div className="col-lg-6" key={idx}>
                      <Link to={`/subCategoryDetails/${subCategory._id}`}>
                        <div className="product p-2 cursor-pointer">
                          <h4 className="mt-3"> {subCategory.name}</h4>
                          <hr />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h2 className="text-center py-5">Not Found Results </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
