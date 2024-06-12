import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("CategorySlider", getAllCategories, {
    refetchOnMount: false,
  });

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 ">
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
      <div className="py-5">
        <h4 className="mb-3">Shop Popular categories</h4>
        <Slider {...settings}>
          {data?.data.data.map((category, idx) => {
            return (
              <Link to={`/categoryDetails/${category._id}`} key={idx}>
                <div>
                  <img
                    style={{ width: "100%", height: "200px" }}
                    src={category.image}
                    alt="slider 1"
                  />

                  <h6 className="my-3">{category.name}</h6>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
