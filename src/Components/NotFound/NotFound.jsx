import React from 'react'
import notFound from "../../images/error.svg"
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="container py-5 d-flex justify-content-center">
        <div className="w-50">
          <img src={notFound} alt="not found" className="w-100" />
        </div>
      </div>
    </>
  );
}
