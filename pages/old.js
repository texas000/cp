import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Customer Portal | James Worldwide, Adding Values to Your Cargo!
        </title>
        <meta
          content="James Worldwide, Adding Values to Your Cargo!"
          name="description"
        />
        <meta property="og:url" content="https://jwitracking.com"></meta>
        <meta property="og:site_name" content="JWI TRACKING"></meta>
        <meta property="og:title" content="TRACK YOUR CARGO"></meta>
        <meta
          property="og:description"
          content="James Worldwide, Adding Values to Your Cargo!"
        ></meta>
        <meta content="James Worldwide Inc" name="author" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar navbar-expand-lg p-3 navbar-dark">
        <div className="container">
          <a href="index.html" className="navbar-brand me-lg-5">
            <img
              src="/assets/images/logo.png"
              alt=""
              className="logo-dark h-4"
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto align-items-center">
              <li className="nav-item mx-lg-1">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link" href="#move">
                  Service
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-0">
                <a
                  href="https://themes.getbootstrap.com/product/hyper-responsive-admin-dashboard-template/"
                  target="_blank"
                  className="nav-link d-lg-none"
                >
                  Dashboard
                </a>
                <Link href="/dashboard">
                  <a className="btn btn-sm btn-light btn-rounded d-none d-lg-inline-flex">
                    Dashboard
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="mt-md-4">
                {/* <div>
                  <span className="badge bg-danger rounded-pill">New</span>
                  <span className="text-white-50 ms-1">
                    Welcome to new landing page
                  </span>
                </div> */}
                <h2 className="text-white fw-normal mb-4 mt-3 hero-title text-4xl font-extrabold">
                  JWI Tracking Portal
                </h2>

                <p className="mb-4 font-16 text-white-50">
                  James Worldwide moves your cargo in the safest and fastest way
                  possible, keeping you informed every step of the way and
                  providing customized and innovative solutions, thereby adding
                  great values to your cargo.
                </p>
                <Link href="/version2">
                  <a className="btn btn-success">
                    Site Version 2 <i className="mdi mdi-arrow-right ms-1"></i>
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-5 offset-md-2">
              <div className="text-md-end mt-3 mt-md-0">
                <img
                  src="assets/images/startup.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section className="py-5" id="move">
        <div className="container">
          <div className="row py-4">
            <div className="col-lg-12">
              <div className="text-center">
                <h1 className="mt-0 text-3xl">
                  <i className="mdi mdi-truck-fast"></i>
                </h1>
                <h3 className="text-3xl font-bold">
                  We <span className="text-primary">Move</span>
                </h3>
                <p className="text-muted mt-2">
                  James Worldwide moves your cargo in the safest and fastest way
                  possible,
                  <br /> keeping you informed every step of the way and
                  providing customized and innovative solutions,
                  <br /> thereby adding great values to your cargo.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-ship text-primary font-24"></i>
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold">Ocean Freight</h4>
                <p className="text-muted mt-2 mb-0">
                  We provides full ocean freight services to create the most
                  highly adaptable, reliable and customizable solutions in the
                  industry.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-plane-fly text-primary font-24"></i>
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold">Air Freight</h4>
                <p className="text-muted mt-2 mb-0">
                  We provides a complete solutions of air logistics for
                  shipments around the globe and for a wide variety of
                  commodities and industries.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-truck text-primary font-24"></i>
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold">Trucking</h4>
                <p className="text-muted mt-2 mb-0">
                  Our commitment to on-time and safe transportation of your
                  cargo has enabled James Worldwide to excel as an industry
                  leader.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-subway text-primary font-24"></i>
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold">Rail</h4>
                <p className="text-muted mt-2 mb-0">
                  James Worldwide provides complete domestic and cross-border
                  intermodal services throughout North America, including Canada
                  and Mexico.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-file-check text-primary font-24"></i>
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold">Customs</h4>
                <p className="text-muted mt-2 mb-0">
                  We has experienced Licensed Customs Brokers that can file your
                  Import Security Filing and monitoring your imports throughout
                  the imports clearance process.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-building text-primary font-24"></i>
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold">Warehouse</h4>
                <p className="text-muted mt-2 mb-0">
                  We provide 3PL warehouse, distribution, fulfillment center
                  services nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 1 */}
      {/* <section className="py-5 bg-light-lighten border-top border-bottom border-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h3>
                  Flexible <span className="text-primary">Layouts</span>
                </h3>
                <p className="text-muted mt-2">
                  There are three different layout options available to cater
                  need for any <br /> modern web application.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-4">
              <div className="demo-box text-center">
                <img
                  src="assets/images/layouts/layout-1.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Vertical Layout</h5>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-2.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Horizontal Layout</h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-3.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Detached Layout</h5>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-4">
              <div className="demo-box text-center">
                <img
                  src="assets/images/layouts/layout-5.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Light Sidenav Layout</h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-6.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Boxed Layout</h5>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-4.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Semi Dark Layout</h5>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CONTACT */}
      <section
        className="py-5 bg-light-lighten border-top border-bottom border-light"
        id="contact"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold">
                  Get In <span className="text-primary">Touch</span>
                </h3>
                <p className="text-muted mt-2">
                  Please fill out the following form and we will get back to you
                  shortly. For more
                  <br />
                  information please contact us.
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center mt-3">
            <div className="col-md-4">
              <p className="text-muted">
                <span className="fw-bold">Customer Support:</span>
                <br /> <span className="d-block mt-1">+1 562 924 0800</span>
              </p>
              <p className="text-muted mt-4">
                <span className="fw-bold">Email Address:</span>
                <br />{" "}
                <span className="d-block mt-1">info@jamesworldwide.com</span>
              </p>
              <p className="text-muted mt-4">
                <span className="fw-bold">Office Address:</span>
                <br />{" "}
                <span className="d-block mt-1">
                  2301 Raymer Avenue, Fullerton CA 92833
                </span>
              </p>
              <p className="text-muted mt-4">
                <span className="fw-bold">Office Time:</span>
                <br /> <span className="d-block mt-1">9:00AM ~ 6:00PM</span>
              </p>
            </div>

            <div className="col-md-8">
              <form>
                <div className="row mt-4">
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="fullname" className="form-label">
                        Your Name
                      </label>
                      <input
                        className="form-control form-control-light"
                        type="text"
                        id="fullname"
                        placeholder="Name..."
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="emailaddress" className="form-label">
                        Your Email
                      </label>
                      <input
                        className="form-control form-control-light"
                        type="email"
                        required=""
                        id="emailaddress"
                        placeholder="Enter you email..."
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-lg-12">
                    <div className="mb-2">
                      <label htmlFor="subject" className="form-label">
                        Your Subject
                      </label>
                      <input
                        className="form-control form-control-light"
                        type="text"
                        id="subject"
                        placeholder="Enter subject..."
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-lg-12">
                    <div className="mb-2">
                      <label htmlFor="comments" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="comments"
                        rows="4"
                        className="form-control form-control-light"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-12 text-end">
                    <button className="btn btn-primary">
                      Send a Message <i className="mdi mdi-telegram ms-1"></i>{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="assets/images/logo.png"
                alt=""
                className="logo-dark h-4"
              />
              <p className="text-muted mt-4">
                James Worldwide moves your cargo in the safest and fastest way
                possible,
                <br /> keeping you informed every step of the way and providing
                customized and innovative solutions, thereby adding great values
                to your cargo.
              </p>

              <ul className="social-list list-inline mt-3">
                <li className="list-inline-item text-center">
                  <a
                    href="#"
                    className="social-list-item border-primary text-primary"
                  >
                    <i className="mdi mdi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="#"
                    className="social-list-item border-danger text-danger"
                  >
                    <i className="mdi mdi-google"></i>
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="#"
                    className="social-list-item border-info text-info"
                  >
                    <i className="mdi mdi-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Company</h5>

              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    About Us
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Documentation
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Blog
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Apps</h5>

              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Ecommerce Pages
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Email
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Social Feed
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Projects
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Tasks Management
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Discover</h5>

              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Help Center
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Our Products
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-muted">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="mt-5">
                <p className="text-muted mt-4 text-center mb-0">
                  © 2021 James Worldwide, Adding Values to Your Cargo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
