import { useContext } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { authContext } from "../../Context/Authentication";
import { Helmet } from "react-helmet";

export default function Profile() {
  const { userName } = useContext(authContext);

  if (userName === null) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 vh-100">
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
        <title>Profile</title>
      </Helmet>
      <div className="container profile">
        <h1>Welcome , {userName}</h1>
      </div>
    </>
  );
}
