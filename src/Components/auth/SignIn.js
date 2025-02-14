import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { dashboard, register, forgot_password, home, kycUnderReview, kycRoute, onfidoKyc } from '../constent/Routes';
import { LoginValid } from "../validations/LoginValid";
import { toast } from 'react-toastify';
import { loginHandle } from "../services/Login";
import { role } from "../constent/Enum"
import PageHeader from "../Widgets/PageHeader";
import Header from "../Widgets/Header";
import Footer from "../Widgets/Footer";
import { useAuth } from '../../AuthContext';
import { getWeb3AuthEVMInstance } from './web3auth';
import { WALLET_ADAPTERS } from '@web3auth/base';
import { CircularProgress } from '@mui/material';
import { isEmailExist as fetchIsEmailExist } from '../services/Login';

const SignIn = () => {
    const { authenticated, login, connectWallet } = useAuth();
    const [loginField, setLoginField] = useState({ email: "", password: "" });
    const [isEmailExist, setIsEmailExist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loginFieldErr, setLoginFieldErr] = useState({
        email: "",
        password: "",
    });
    const [passwordShow, setPasswordShow] = useState({
        eye: "fa-eye-slash",
        type: "password",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) {
            navigate(dashboard, { replace: true });
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [authenticated, navigate]);


    const showcurrentPassword = () => {
        if (passwordShow.type === "password") {
            setPasswordShow({ eye: "fa-eye", type: "text" });
        } else {
            setPasswordShow({ eye: "fa-eye-slash", type: "password" });
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setLoginField({ ...loginField, [name]: value });
        let checkLogin = LoginValid(name, value);
        setLoginFieldErr({ ...loginFieldErr, [name]: checkLogin });
        if (name == "email") {
            try {
                debugger;
                let data = { email: value }
                setIsEmailExist("Loading");
                const resp = await fetchIsEmailExist(data)
                if (resp.success) {
                    if (resp.isEmailExists) {
                        setTimeout(() => {
                            setIsEmailExist(true);
                        }, 1000); // Delay of 1 second gives soomth experience.
                    } else {
                        setTimeout(() => {
                            setIsEmailExist(false);
                        }, 1000); // Delay of 1 second gives soomth experience.
                    }
                }
            } catch (ex) {
                toast.error("Something went wrong.");
                setIsEmailExist(false);
            }
        }
    };



    const onLogin = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            // Validate the fields
            for (let key in loginField) {
                let checkLogin = LoginValid(key, loginField[key]);
                setLoginFieldErr({ ...loginFieldErr, [key]: checkLogin });
                if (checkLogin !== "") {
                    setIsLoading(false);
                    return false;

                }
            }

            if(!isEmailExist){
                toast.error("Please register your email.");
                setIsLoading(false);
                return;
            }

            let LoginData = {
                email: loginField.email,
                password: loginField.password,
                role: role.User
            };


            let result = await loginHandle(LoginData);

            if (result.success) {
                try {

                    await connectWallet(loginField.email.trim().toLowerCase());

                    if( !getWeb3AuthEVMInstance().connected){
                        setIsLoading(false);
                        toast.error("Failed to verify your email.");
                        return;
                    }

                } catch (error) {
                    setIsLoading(false);
                    console.error("Web3Auth error:", error);
                    toast.error("Something went wrong");
                    return;
                }


                const user = await getWeb3AuthEVMInstance().getUserInfo();

                if(!user){
                    setIsLoading(false);
                    toast.error("Failed to get users details");
                }

                if (user?.verifierId.trim().toLowerCase() !== loginField.email.trim().toLowerCase()) {
                    toast.error("Connected ID and email in the registration form don't match.");
                    await getWeb3AuthEVMInstance().logout();
                    setIsLoading(false);
                    return false;
                }
                localStorage.setItem("jwtToken", result?.data?.access_token);

                await login();
                toast.success(result?.message);

                if (result?.data?.kycStatus !== "NOT_SUBMITTED") {
                    setTimeout(function () {
                        setIsLoading(false);
                        navigate(kycUnderReview, { replace: true });
                    }, 2000);
                } else {
                    setTimeout(function () {
                        setIsLoading(false);
                        navigate(dashboard, { replace: true });
                    }, 2000);
                }
                setIsLoading(false);
                return false;
            } else {
                setIsLoading(false);
                toast.error(result.message);
                return;
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Login failed: ", error);
            toast.error("An error occurred during login. Please try again.");
        }
        setIsLoading(false);
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
                                                        placeholder="Email"
                                                        onChange={handleChange}
                                                        name="email"
                                                        value={loginField.email}
                                                        className="form-control"
                                                        id="account-email"
                                                    />
                                                    {loginFieldErr && <span className='' style={{ color: "red" }}>{loginFieldErr?.email}</span>}
                                                    {loginFieldErr.email === "" && isEmailExist !== null && isEmailExist !== "Loading" && (
                                                        <span style={{ color: isEmailExist ? "green" : "red", display: 'flex', alignItems: 'center' }}>
                                                            {/* Conditionally render the icon and text */}
                                                            {!isEmailExist ? (
                                                                <>
                                                                    <span style={{ marginRight: '8px' }}>✖</span> {/* Cross symbol */}
                                                                    {"Email is not registered."}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span style={{ marginRight: '8px' }}>✔</span> {/* Checkmark symbol */}
                                                                    {"Email verified."}
                                                                </>
                                                            )}
                                                        </span>
                                                    )}

                                                    {loginFieldErr.email === "" && isEmailExist === "Loading" && (
                                                        <div style={{
                                                            padding:'10px',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        }}>
                                                            <CircularProgress size={16} />
                                                            <span style={{
                                                                fontSize: '14px',
                                                                marginLeft: '8px'
                                                            }}>
                                                                {" checking your email ..."}
                                                            </span>
                                                        </div>
                                                    )}

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

                                                    {
                                                        <button
                                                            type="button"
                                                            id="btnToggle"
                                                            className="form-pass__toggle"
                                                            onClick={showcurrentPassword}

                                                        >
                                                            <i id="eyeIcon" className={`fa ${passwordShow.eye}`}></i>
                                                        </button> 
                                                    }
                                                </div>
                                                {loginFieldErr && <span className='' style={{ color: "red" }}>{loginFieldErr?.password}</span>}
                                            </div>

                                        </div>

                                        <div className="account__check">

                                            <div className="account__check-forgot">
                                                <Link to={forgot_password}>Forgot Password?</Link>
                                            </div>
                                        </div>

                                        {!isLoading?<button
                                            type="submit"
                                            className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                                        >
                                            Sign in
                                        </button>:
                                                        (
                                                            <div style={{
                                                                display: 'flex',
                                                                padding: '20px',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                gap: '8px'
                                                            }}>
                                                                <CircularProgress size={25} />
                                                                <span style={{
                                                                    fontSize: '14px',
                                                                    marginLeft: '8px'
                                                                }}>
                                                                </span>
                                                            </div>
                                                        )}
                                    </form>

                                    <div className="account__switch">
                                        <p>
                                            Don't have an account? <Link to={register}>Sign up</Link>
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
