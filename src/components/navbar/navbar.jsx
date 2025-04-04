import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserData } from "../../features/userSlice";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase-config";

const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);
    const { open, setOpen } = useContext(MyContext);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogged, setLoginStatus] = useState(true);
    const { user } = useSelector((state) => state.user);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoginStatus(!!user);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("user"); // 🧹 Clear stored user session
            dispatch(deleteUserData()); // Reset Redux state
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="h-24 flex md:px-7 px-2 w-full justify-between fixed z-10 items-center"
            style={{
                backgroundColor: scrolling ? "white" : "transparent",
                transition: "background-color 0.6s ease-out",
            }}
        >
            <div className="logo flex align-middle">
                <button onClick={() => navigate('/')} className="focus:outline-none">
                    <img className="h-24 p-2 max-sm:hidden" src="/logo11.png" alt="Logo" />
                    <img className="h-16 p-2 sm:hidden" src="/logo11.png" alt="Logo" />
                </button>
            </div>

            <div className="center-portion flex justify-center">
                {[
                    { name: "Home", path: "/" },
                    { name: "Identify Abuse", path: "/abuse" },
                    { name: "Community", path: "/community" },
                    { name: "Stories", path: "/stories" },
                    { name: "Help", path: "/help" },
                    ...(user ? [{ name: "Consult", path: "/consult" }] : []),
                ].map(({ name, path }, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            navigate(path);
                            console.log(auth?.currentUser?.email);
                        }}
                        className="text-black mx-4 font-serif font-bold hover:text-gray-600 cursor-pointer focus:outline-none"
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="relative">
                {isLogged ? (
                    <button
                        className="profile flex items-center justify-center"
                        style={{
                            height: '50px',
                            width: '50px',
                            borderRadius: '50%',
                            background: 'transparent',
                            boxShadow: '0 0 2px black',
                        }}
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        <img src="/femaleLogo.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
                    </button>
                ) : (
                    <button onClick={() => navigate("/login")}>Login</button>
                )}

                {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-4">
                        <button 
                            onClick={() => navigate('/profile')} 
                            className="w-full mb-2 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            User Profile
                        </button>
                        <button 
                            onClick={() => navigate('/settings')} 
                            className="w-full mb-2 bg-gray-500 text-white py-1 rounded hover:bg-gray-600 focus:outline-none"
                        >
                            Settings
                        </button>
                        <button  
                            onClick={logout} 
                            className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
