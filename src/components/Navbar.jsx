import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiUserCircle } from 'react-icons/bi';
import { AuthContext } from "../contexts/UserContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(e => console.error(e))
    }


    return (
        <div className="bg-gray-800 font-secondary lg:fixed top-0 right-0 left-0 z-10">
            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="relative flex items-center justify-between">
                    <Link to='/'
                        aria-label="Rate IS Services"
                        title="Rate IS Services"
                        className="inline-flex items-center"
                    >
                        <span className="ml-2 text-xl font-bold tracking-wide text-white hover:text-sky-300">
                            Rate IS Services
                        </span>
                    </Link>

                    <ul className="items-center hidden space-x-8 lg:flex">
                        <li>
                            <NavLink
                                to="/home"
                                aria-label="Home"
                                title="Home"
                                className={`font-medium tracking-wide text-white hover:text-sky-300`}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/about-us"
                                aria-label="about-us"
                                title="about-us"
                                className={`font-medium tracking-wide text-white hover:text-sky-300`}
                            >
                                About Us
                            </NavLink>
                        </li>


                        {
                            user?.uid &&
                            <>
                                <li>
                                    <NavLink to="/summary"
                                        aria-label="summary"
                                        title="summary"
                                        className="font-medium tracking-wide text-white hover:text-sky-300"
                                    >
                                        Summary
                                    </NavLink>
                                </li>
                            </>
                        }

                        {
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    aria-label="dashboard"
                                    title="dashboard"
                                    className={`font-medium tracking-wide text-white hover:text-sky-300`}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        }

                        <li>
                            <div

                            >
                                {
                                    user?.uid ?
                                        <div className="flex items-center">
                                            <Link to='/dashboard/profile'>
                                                {
                                                    user?.photoURL ?
                                                        <div className="flex items-center" title={user?.displayName ? user.displayName : 'No Name'}>
                                                            <img className="max-w-8 max-h-8 border border-sky-300" src={user?.photoURL} alt="" />
                                                        </div>
                                                        :
                                                        <div className="flex items-center" title={user?.displayName ? user.displayName : 'No Name'}>
                                                            <BiUserCircle className="w-7 h-7 border border-sky-300 mr-2 rounded-md" />
                                                        </div>
                                                }
                                            </Link>
                                            <button className="font-medium tracking-wide text-white hover:text-sky-300 border px-2 py-[3.2px]" onClick={handleLogOut}>Log Out</button>
                                        </div>
                                        :
                                        <>
                                            <Link to='/login' className="font-medium tracking-wide text-white hover:text-sky-300">Log In</Link>
                                        </>
                                }
                            </div>
                        </li>
                    </ul>
                    <div className="lg:hidden flex items-center">
                        <div>
                            {
                                user?.uid ?
                                    <div className="flex items-center text-white">
                                        <Link to='/dashboard/profile'>
                                            {
                                                user?.photoURL ?
                                                    <div className="flex items-center" title={user?.displayName}>
                                                        <img className="max-w-8 max-h-8 mr-2 border border-sky-300" src={user?.photoURL} alt="" />
                                                    </div>
                                                    :
                                                    <div className="flex items-center">
                                                        <BiUserCircle className="w-7 h-7 border border-sky-300 mr-2 rounded-md" />
                                                    </div>
                                            }
                                        </Link>
                                    </div>
                                    :
                                    <>
                                    </>
                            }
                        </div>
                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-5 text-white" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-0 left-0 w-full z-10">
                                <div className="p-5 bg-white border rounded shadow-sm nav-mobile-menu">
                                    <div className="flex items-center justify-between mb-4">

                                        <div>
                                            <button
                                                aria-label="Close Menu"
                                                title="Close Menu"
                                                className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <nav>
                                        <ul className="space-y-4 text-center">
                                            <li>
                                                <NavLink to='/home'
                                                    aria-label="Home"
                                                    title="Home"
                                                    className="font-medium tracking-wide"
                                                >
                                                    Home
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/brands"
                                                    aria-label="brands"
                                                    title="brands"
                                                    className="font-medium tracking-wide"
                                                >
                                                    Brands
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink to="/reviews"
                                                    aria-label="reviews"
                                                    title="reviews"
                                                    className="font-medium tracking-wide"

                                                >
                                                    Reviews
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dashboard"
                                                    aria-label="dashboard"
                                                    title="dashboard"
                                                    className={`font-medium tracking-wide`}
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/blog'
                                                    aria-label="Blog"
                                                    title="Blog"
                                                    className="font-medium tracking-wide"
                                                >
                                                    Blog
                                                </NavLink>
                                            </li>
                                            <li>
                                                <div to='/login'
                                                    className="cursor-pointer bg-slate-500 flex items-center justify-center gap-2 h-12 px-2 text-white hover:bg-sky-700 duration-200 rounded shadow-md"

                                                >
                                                    {
                                                        user?.uid ?
                                                            <div className="flex items-center">
                                                                <button onClick={handleLogOut}>Log Out</button>
                                                            </div>
                                                            :
                                                            <>
                                                                <Link to='/login'>Log In</Link>
                                                            </>
                                                    }
                                                </div>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar;