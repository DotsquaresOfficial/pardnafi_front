import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../Widgets/PageHeader";
import { resetPassword } from "../services/Login";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const { otp } = useParams(); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const result = await resetPassword({ resetPasswordOtp: otp, password: password });

        if (result?.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <><PageHeader title="Reset  Passord" text="Reset passord" />
            <div className="account padding-top padding-bottom sec-bg-color2">
                <div className="bg-white p-6 rounded-lg shadow-md w-96">
                    <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="block font-medium mb-1">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="account__switch"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default ResetPassword;
