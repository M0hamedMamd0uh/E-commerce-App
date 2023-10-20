import React from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import HomeSlider from "../HomeSlider/HomeSlider";
import Products from "../Products/Products";

export default function Home() {


  return (
    <>
      <div className="container py-5">
        <div className="row gx-0 gy-5 mb-5">
          <div className="col-lg-9">
            <HomeSlider />
          </div>
          <div className="col-lg-3">
            <img
              style={{ width: "100%", height: "200px" }}
              src={require("../../images/grocery-banner-2.jpeg")}
              alt="grocery-banner-2"
            />
            <img
              style={{ width: "100%", height: "200px" }}
              src={require("../../images/grocery-banner.png")}
              alt="grocery-banner-1"
            />
          </div>
        </div>

        <CategorySlider />

        <Products />
      </div>
    </>
  );
}
