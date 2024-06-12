import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loader, setLoader] = useState(false);

  async function addNewUser(values) {
    setLoader(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message === "success") {
        setSuccessMsg("Email Has Created Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (e) {
      console.log(e.response.data.message);
      setErrorMsg(e.response.data.message);
    }

    setLoader(false);
  }

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: addNewUser,
    validate: function (values) {
      setErrorMsg(null);
      const errors = {};

      if (values.name.length < 4 || values.name.length > 20) {
        errors.name = "Name must between 4 and 20 characters";
      }

      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "Email Invalid";
      }

      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = "Phone Invalid";
      }

      if (values.password.length < 6 || values.password.length > 15) {
        errors.password = "Password must between 6 and 15 characters";
      }

      if (values.rePassword !== values.password) {
        errors.rePassword = "Password and rePassword not matched";
      }

      return errors;
    },
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container py-5">
        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
        {successMsg ? (
          <div className="alert alert-success">{successMsg}</div>
        ) : (
          ""
        )}
        <h2 className="mb-4">Register Now :</h2>
        <form onSubmit={formikObj.handleSubmit}>
          <label className="mb-2" htmlFor="name">
            Name :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.name}
            className="form-control mb-3"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
          />
          {formikObj.errors.name && formikObj.touched.name ? (
            <div className="alert alert-danger">{formikObj.errors.name}</div>
          ) : (
            ""
          )}
          <label className="mb-2" htmlFor="email">
            Email :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.email}
            className="form-control mb-3"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          {formikObj.errors.email && formikObj.touched.email ? (
            <div className="alert alert-danger">{formikObj.errors.email}</div>
          ) : (
            ""
          )}
          <label className="mb-2" htmlFor="phone">
            Phone :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.phone}
            className="form-control mb-3"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Phone"
          />{" "}
          {formikObj.errors.phone && formikObj.touched.phone ? (
            <div className="alert alert-danger">{formikObj.errors.phone}</div>
          ) : (
            ""
          )}
          <label className="mb-2" htmlFor="password">
            Password :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.password}
            className="form-control mb-3"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          {formikObj.errors.password && formikObj.touched.password ? (
            <div className="alert alert-danger">
              {formikObj.errors.password}
            </div>
          ) : (
            ""
          )}
          <label className="mb-2" htmlFor="rePassword">
            Re Password :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.rePassword}
            className="form-control mb-3"
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="rePassword"
          />
          {formikObj.errors.rePassword && formikObj.touched.rePassword ? (
            <div className="alert alert-danger">
              {formikObj.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={formikObj.isValid === false || formikObj.dirty === false}
            type="submit"
            className="btn btn-success d-flex ms-auto"
          >
            {loader ? (
              <FallingLines
                color="#fff"
                width="30"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
