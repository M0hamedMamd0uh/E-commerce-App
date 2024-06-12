import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-main-light py-5">
        <div className="container ">
          <h2>Get The FreshCart app</h2>
          <p className="text-muted">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="px-2">
            <div className="row g-4">
              <div className="col-md-8 col-lg-9 col-xl-10">
                <div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email .."
                  />
                </div>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-2">
                <div>
                  <button
                    type="button"
                    className="btn bg-main text-white w-100"
                  >
                    Share App link
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div className="row g-4 align-items-center">
                <div className="col-12 col-xl-6">
                  <div>
                    <span className="pe-3">Payment Partners</span>
                    <span className="logo payment-logo">
                      <img
                        src={require("../../images/pngwing.com.png")}
                        alt="amazonPay logo"
                      />
                      <img
                        src={require("../../images/pngwing.com (3).png")}
                        alt="american-express logo"
                      />
                      <img
                        src={require("../../images/pngwing.com (2).png")}
                        alt="mastercard logo"
                      />
                      <img
                        src={require("../../images/pngwing.com (1).png")}
                        alt="paypal logo"
                      />
                    </span>
                  </div>
                </div>
                <div className="col-12 col-xl-6 text-start text-xl-end">
                  <span className="pe-3">Get deliveries with freshCart</span>
                  <span className="logo logo-store">
                    <img
                      src={require("../../images/pngwing.com (5).png")}
                      alt="google-Play logo"
                    />
                    <img
                      src={require("../../images/pngwing.com (4).png")}
                      alt="appStore logo"
                    />
                  </span>
                </div>
              </div>
            </div>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
