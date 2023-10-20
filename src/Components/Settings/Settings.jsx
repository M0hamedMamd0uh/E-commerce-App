import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import * as yup from "yup";
import { authContext } from "../../Context/Authentication";
import { Helmet } from "react-helmet";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [loadingForPersonalData, setloadingForPersonalData] = useState(false);
  const { setToken, setUserName } = useContext(authContext);


  const validationSchema = yup.object({
    currentPassword: yup
      .string("Current password must be a String")
      .required("Current password is required")
      .min(6, "Current password must be more than 6 characters")
      .max(15, "Current password must be less than 15 characters"),
    password: yup
      .string("Password must be a String")
      .required("Password is required")
      .min(6, "password must be more than 6 characters")
      .max(15, "Password must be less than 15 characters"),
    rePassword: yup
      .string("rePassword must be a String")
      .oneOf([yup.ref("password")], "Passwords must be identical")
      .typeError("'Passwords must match'")
      .required("rePassword is required")
      .min(6, "repassword must be more than 6 characters")
      .max(15, "rePassword must be less than 15 characters"),
  });

  const formikobj = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,

    onSubmit: handleSubmitUpdateUserPassword,
  });

  async function handleSubmitUpdateUserPassword(values) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      );

      setToken(data.token);
      localStorage.setItem("token", data.token);

      if (data.message === "success") {
        toast.success("Password Updated Successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  }

  // for update personal Data
  const validationSchemaForPersonalData = yup.object({
    name: yup
      .string("Name must be string")
      .required("Name is required")
      .min(6, "Name must be more than 6 characters")
      .max(15, "Name must be less than 15 characters"),
    email: yup
      .string("Email must be a string")
      .required("Email is required")
      .email("Email must be valid"),
    phone: yup
      .string("phone must be string")
      .matches(/^(02)?01[0125][0-9]{8}$/, "Phone is invalid")
      .required("Phone is required"),
  });

  const formikobjForPersonalData = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchemaForPersonalData,

    onSubmit: handleSubmitUpdatePersonalData,
  });

  async function handleSubmitUpdatePersonalData(values) {
    setloadingForPersonalData(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      );

      setUserName(data.user.name);
      if (data.message === "success") {
        toast.success("Password Updated Successfully");
      }
    } catch (error) {
      toast.error(error.response.data.errors.msg);
    }
    setloadingForPersonalData(false);
  }

  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="container py-5">
        <div>
          <h3>Change Password :</h3>
          <hr />
          <form onSubmit={formikobj.handleSubmit} className="px-5">
            <div className="mb-3">
              <label htmlFor="currentPassword" className="mb-2">
                Current Password :
              </label>
              <input
                autoComplete="off"
                id="currentPassword"
                type="password"
                placeholder="Enter Current Password"
                className="form-control mb-2"
                name="currentPassword"
                value={formikobj.values.currentPassword}
                onChange={formikobj.handleChange}
                onBlur={formikobj.handleBlur}
              />
              {formikobj.errors.currentPassword &&
              formikobj.touched.currentPassword ? (
                <div className="alert alert-danger">
                  {formikobj.errors.currentPassword}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="mb-2">
                Password :
              </label>
              <input
                autoComplete="off"
                id="password"
                type="password"
                placeholder="Enter New Password"
                className="form-control mb-2"
                name="password"
                value={formikobj.values.password}
                onChange={formikobj.handleChange}
                onBlur={formikobj.handleBlur}
              />
              {formikobj.errors.password && formikobj.touched.password ? (
                <div className="alert alert-danger">
                  {formikobj.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="rePassword" className="mb-2">
                rePassword :
              </label>
              <input
                autoComplete="off"
                id="rePassword"
                type="password"
                placeholder="Enter New rePassword"
                className="form-control mb-2"
                name="rePassword"
                value={formikobj.values.rePassword}
                onChange={formikobj.handleChange}
                onBlur={formikobj.handleBlur}
              />
              {formikobj.errors.rePassword && formikobj.touched.rePassword ? (
                <div className="alert alert-danger">
                  {formikobj.errors.rePassword}
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              disabled={
                formikobj.isValid === false || formikobj.dirty === false
              }
              type="submit"
              className="btn bg-main btnHover text-white d-flex ms-auto"
            >
              {loading ? (
                <FallingLines
                  color="#fff"
                  width="30"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
        <hr />

        <div>
          <h3>Change Personal Data :</h3>
          <hr />
          <form
            onSubmit={formikobjForPersonalData.handleSubmit}
            className="px-5"
          >
            <div className="mb-3">
              <label htmlFor="name" className="mb-2">
                New Name :
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter New Name"
                className="form-control mb-2"
                name="name"
                value={formikobjForPersonalData.values.name}
                onChange={formikobjForPersonalData.handleChange}
                onBlur={formikobjForPersonalData.handleBlur}
              />
              {formikobjForPersonalData.errors.name &&
              formikobjForPersonalData.touched.name ? (
                <div className="alert alert-danger">
                  {formikobjForPersonalData.errors.name}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="mb-2">
                New Email :
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter New Email"
                className="form-control mb-2"
                name="email"
                value={formikobjForPersonalData.values.email}
                onChange={formikobjForPersonalData.handleChange}
                onBlur={formikobjForPersonalData.handleBlur}
              />
              {formikobjForPersonalData.errors.email &&
              formikobjForPersonalData.touched.email ? (
                <div className="alert alert-danger">
                  {formikobjForPersonalData.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="mb-2">
                New Phone :
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter New Phone"
                className="form-control mb-2"
                name="phone"
                value={formikobjForPersonalData.values.phone}
                onChange={formikobjForPersonalData.handleChange}
                onBlur={formikobjForPersonalData.handleBlur}
              />
              {formikobjForPersonalData.errors.phone &&
              formikobjForPersonalData.touched.phone ? (
                <div className="alert alert-danger">
                  {formikobjForPersonalData.errors.phone}
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              disabled={
                formikobjForPersonalData.isValid === false ||
                formikobjForPersonalData.dirty === false
              }
              type="submit"
              className="btn bg-main btnHover text-white d-flex ms-auto"
            >
              {loadingForPersonalData ? (
                <FallingLines
                  color="#fff"
                  width="30"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              ) : (
                "Change Personal Data"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
