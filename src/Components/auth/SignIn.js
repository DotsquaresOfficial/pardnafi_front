import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { dashboard, register, forgot_password, home, kycUnderReview, kycRoute, onfidoKyc } from '../constent/Routes';
import { LoginValid } from "../validations/LoginValid";
import toastr from 'toastr';
import { loginHandle } from "../services/Login";
import { role } from "../constent/Enum"
import PageHeader from "../Widgets/PageHeader";
import Header from "../Widgets/Header";
import Footer from "../Widgets/Footer";

const SignIn = () => {
    const navigate = useNavigate()
    const [loginField, setLoginField] = useState({ email: "", password: "" });

    const [loginFieldErr, setLoginFieldErr] = useState({
        email: "",
        password: "",
    });
    const [passwordShow, setPasswordShow] = useState({
        eye: "fa-eye-slash",
        type: "password",
    });

    // useEffect(() => {

    //   if (authenticated) {
    //     navigate(dashboard, { replace: true });
    //   } else {

    //   }
    // }, [authenticated, navigate]);


    const showcurrentPassword = () => {
        if (passwordShow.type === "password") {
            setPasswordShow({ eye: "fa-eye", type: "text" });
        } else {
            setPasswordShow({ eye: "fa-eye-slash", type: "password" });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginField({ ...loginField, [name]: value });
        let checkLogin = LoginValid(name, value);
        setLoginFieldErr({ ...loginFieldErr, [name]: checkLogin });
    };

    const onLogin = async (event) => {
        event.preventDefault();

        try {
            // Validate the fields

            for (let key in loginField) {
                let checkLogin = LoginValid(key, loginField[key]);
                setLoginFieldErr({ ...loginFieldErr, [key]: checkLogin });
                if (checkLogin !== "") {
                    return false;
                }
            }

            let LoginData = {
                email: loginField.email,
                password: loginField.password,
                role: role.User
            };


            let result = await loginHandle(LoginData);



            if (result.success) {
                localStorage.setItem("jwtToken", result?.data?.access_token);

                //   login();
                toastr.success(result?.message);

                if (result?.data?.kycStatus !== "NOT_SUBMITTED") {
                    setTimeout(function () {
                        navigate(kycUnderReview, { replace: true });
                    }, 2000);
                } else {
                    setTimeout(function () {
                        navigate(onfidoKyc, { replace: true });
                    }, 2000);
                }

                return false;
            } else {
                toastr.error(result.message);
                return;
            }
        } catch (error) {
            console.error("Login failed: ", error);
            toastr.error("An error occurred during login. Please try again.");
        }
    };


    return (
        <>
            <Header />
            <PageHeader title="Sign In" text="Sign In" />
            <section className="account padding-top padding-bottom sec-bg-color2">
                <div className="container">
                    <div
                        className="account__wrapper"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        <div className="row g-4">
                            <div className="col-lg-12">
                                <div className="account__content account__content--style1">
                                    <div className="account__header">
                                        <h2>Welcome back!</h2>
                                        <p>
                                            Log in to manage your savings and groups securely.
                                        </p>
                                    </div>


                                    <form
                                        action=""
                                        className="account__form needs-validation"
                                        noValidate
                                        onSubmit={onLogin}
                                    >
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <div>
                                                    <label htmlFor="account-email" className="form-label">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"

                                                        onChange={handleChange}
                                                        name="email"
                                                        value={loginField.email}
                                                        className="form-control"
                                                        id="account-email"


                                                    />
                                                    {loginFieldErr && <span className='' style={{ color: "red" }}>{loginFieldErr?.email}</span>}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-pass">
                                                    <label htmlFor="account-pass" className="form-label">
                                                        Password
                                                    </label>
                                                    <input

                                                        className="form-control showhide-pass"
                                                        id="account-pass"
                                                        placeholder="Password"
                                                        type={passwordShow.type}
                                                        onChange={handleChange}
                                                        name="password"
                                                        value={loginField.password}

                                                    />

                                                    <button
                                                        type="button"
                                                        id="btnToggle"
                                                        className="form-pass__toggle"
                                                        onClick={showcurrentPassword}

                                                    >
                                                        <i id="eyeIcon" className={`fa ${passwordShow.eye}`}></i>
                                                    </button>
                                                </div>
                                                {loginFieldErr && <span className='' style={{ color: "red" }}>{loginFieldErr?.password}</span>}
                                            </div>

                                        </div>

                                        <div className="account__check">
                                            <div className="account__check-remember">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value=""
                                                    id="terms-check"
                                                />
                                                <label htmlFor="terms-check" className="form-check-label">
                                                    Remember me
                                                </label>
                                            </div>
                                            <div className="account__check-forgot">
                                                <Link to="/forgot-pass">Forgot Password?</Link>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                                        >
                                            Sign in
                                        </button>
                                    </form>

                                    <div className="account__switch">
                                        <p>
                                            Don't have an account? <Link to="/SignUp">Sign up</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account__shape">
                    <span className="account__shape-item account__shape-item--1">
                        <img src="/images/contact/4.png" alt="shape-icon" />
                    </span>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SignIn;
