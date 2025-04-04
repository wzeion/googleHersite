import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../features/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config"; // ✅ Ensure Firebase is correctly set up

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [EmailError, setEmailError] = useState("");
    const [PasswordError, setPasswordError] = useState("");
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Auto-redirect if already logged in
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
              navigate("/");
          }
      });
  
      return () => unsubscribe();
  }, [navigate]);

    // ✅ Email Validation
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(regex.test(value) ? "" : "Invalid email format");
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    // ✅ Password Validation
    const validatePassword = (value) => {
        setPasswordError(value.length >= 8 ? "" : "Password must be at least 8 characters");
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    // ✅ Firebase Login Function
    const submitForm = async (e) => {
        e.preventDefault();
        if (!EmailError && !PasswordError) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("✅ User Logged In:", userCredential.user);

                // Save user data to Redux
                dispatch(updateUserDetails(userCredential.user));

                // Store user in localStorage
                localStorage.setItem("user", JSON.stringify(userCredential.user));

                toast.success("✅ Login Successful!");
                setTimeout(() => navigate("/"), 2000);
            } catch (error) {
                console.error("❌ Login Error:", error);
                if (error.code === "auth/wrong-password") {
                    toast.error("❌ Incorrect password!");
                } else if (error.code === "auth/user-not-found") {
                    toast.error("⚠️ No account found with this email.");
                } else {
                    toast.error("❌ Login failed. Try again.");
                }
            }
        } else {
            toast.error(EmailError || PasswordError);
        }
    };

    return (
        <div className="bg-gray-100 flex w-full h-screen justify-center items-center px-28">
            <div className="w-1/2 max-lg:hidden flex justify-start items-center">
                <img className="transform -hue-rotate-18 h-[29rem]" src="./login.png" alt="Login" />
            </div>
            <div className="flex p-5 items-center">
                <div className="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                    <h4 className="block font-mono text-2xl font-semibold text-blue-gray-900">Login</h4>

                    <form className="max-w-screen-lg mt-5 mb-2 w-80 sm:w-96" onSubmit={submitForm}>
                        <div className="flex flex-col gap-4 mb-1">
                            <h6 className="block text-sm font-semibold text-blue-gray-900">Your Email</h6>
                            <input 
                                value={email} 
                                onChange={handleEmailChange}
                                placeholder="name@mail.com"
                                className="w-full px-3 py-3 border border-black border-opacity-20 rounded-md focus:border-black"
                            />
                            {EmailError && <p className="text-red-500 text-xs">{EmailError}</p>}

                            <h6 className="block text-sm font-semibold text-blue-gray-900">Password</h6>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={handlePasswordChange}
                                placeholder="********"
                                className="w-full px-3 py-3 border border-black border-opacity-20 rounded-md focus:border-black"
                            />
                            {PasswordError && <p className="text-red-500 text-xs">{PasswordError}</p>}
                        </div>

                        <button
                            type="submit"
                            className="mt-6 block w-full rounded-lg bg-gray-900 py-3 px-6 text-white font-bold uppercase hover:shadow-lg"
                        >
                            Sign in
                        </button>

                        <p className="mt-4 text-sm text-center text-gray-700">
                            Don't have an account? 
                            <Link to='/register' className="font-medium text-gray-900"> Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
