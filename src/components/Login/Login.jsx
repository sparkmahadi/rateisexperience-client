import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../contexts/UserContext';
import Spinner from '../Spinner/Spinner';

const Login = () => {
    const [error, setError] = useState('');
    const { logIn, logInWithGoogle, loading, setLoading } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(r => {
                const user = r.user;
                console.log(user);
                form.reset();
                setError('');
                if (user) {
                    setUserEmail(user?.email);
                }
            })
            .catch(e => {
                console.log(e);
                setError(e.message);
                setLoading(false);
            })
    }
    const handleGoogleLogin = () => {
        logInWithGoogle()
            .then(r => {
                const user = r.user;
                console.log(user);
                setError('');
                if (user) {
                    saveUser(user.displayName, user.email, 'Buyer');
                    // setUserEmail(user.email);
                }
            })
            .catch(e => {
                console.log(e);
                setError(e.message);
                setLoading(false);
            })
    }

    const saveUser = (name, email, accountType) => {
        const user = { name, email, accountType };
        fetch('https://next-rep-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserEmail(user.email);
            })
    }

    useEffect(() => {
        if (userEmail) {
            navigate(from, { replace: true });
        }
    }, [userEmail])

    return (
        <div className='min-h-screen'>
            <Toaster />
            <h2 className='bg-secondary p-2 text-white text-center text-xl lg:text-2xl font-semibold uppercase'>Log In</h2>
            {
                loading &&
                <div className='custom-align'><Spinner /></div>
            }

            <form onSubmit={handleSubmit} className='container mx-auto bg-white px-5 lg:px-10 py-10 rounded-lg text-gray-900 md:w-2/3 lg:w-1/2'>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-lg font-medium">Your email</label>
                    <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Email" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-lg font-medium">Your password</label>
                    <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l block w-full p-2.5" placeholder='Enter Your Password' required />
                </div>

                <p className='text-red-600 mb-2'>{error}</p>
                <p className='pb-2'>New to the site? Please <Link className='text-secondary font-semibold' to='/register'>Register</Link> Now!</p>

                <button type="submit" className="btn-success btn btn-sm text-white">Login</button>
                <p className='py-2 text-center'>Forgot Password? <Link to='/reset-password' className='text-secondary font-semibold'>Reset</Link> Your Password.</p>
               
            </form>
        </div>
    );
};

export default Login;