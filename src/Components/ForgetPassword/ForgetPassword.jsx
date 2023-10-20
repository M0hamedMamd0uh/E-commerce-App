import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string("Email must be a string")
      .required("Email is required")
      .email("Email must be valid"),
  });

  const formikobj = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,

    onSubmit: handleSubmitEmail,
  });

  async function handleSubmitEmail(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );

      if (data.statusMsg === "success") {
        navigate("/verifyCode");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="container py-5 ">
        <div className="py-3">
          <h2>Find Your Account : </h2>
          <hr />
        </div>
        <form onSubmit={formikobj.handleSubmit}>
          <label htmlFor="email" className="mb-2">
            Email :
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter Your Email"
            className="form-control mb-2"
            name="email"
            value={formikobj.values.email}
            onChange={formikobj.handleChange}
            onBlur={formikobj.handleBlur}
          />
          {formikobj.errors.email && formikobj.touched.email ? (
            <div className="alert alert-danger">{formikobj.errors.email}</div>
          ) : (
            ""
          )}

          <button
            disabled={formikobj.isValid === false || formikobj.dirty === false}
            type="submit"
            className="btn bg-main btnHover text-white d-flex ms-auto mt-4"
          >
            {loading ? (
              <FallingLines
                color="#fff"
                width="30"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            ) : (
              " Send"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
