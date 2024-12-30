import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/UserContext';
import Spinner from '../Spinner/Spinner';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const { createNewUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const accountType = form.accountType.value;

        let photoURL = '';
        const image = form.photo.files[0];
        const formData = new FormData();
        formData.append('image', image);
        // const image = data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData);
                if (imageData.success) {
                    photoURL = imageData.data.url;
                    // creating user after uploading the image
                    createNewUser(email, password)
                        .then(r => {
                            const user = r.user;
                            console.log(user);
                            setError('');
                            form.reset();
                            handleUpdateUserProfile(name, photoURL);
                            if (user) {
                                saveUser(name, email, accountType);

                            }
                        })
                        .catch(e => {
                            console.error(e);
                            setError(e.message);
                            setLoading(false);
                        })


                }
            })



    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => { })
            .catch(e => console.error(e));
    }

    const saveUser = (name, email, accountType) => {
        const user = { name, email, accountType, verified: false };
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
                if (data.acknowledged) {
                    toast.success("Account Registered Successfully");
                    setUserEmail(user?.email);
                }
            })
    }

    useEffect(() => {
        if (userEmail) {
            navigate(from, { replace: true });
        }
    }, [userEmail])

    return (
        <div>
            {
                loading && <div className="custom-align"><Spinner></Spinner></div>
            }
            <h2 className='bg-secondary p-2 text-white text-center text-xl lg:text-2xl font-semibold uppercase'>Registration</h2>
            <form data-aos="fade-right" data-aos-duration="2000" onSubmit={handleSubmit} className='container mx-auto bg-white px-10 py-10 rounded-lg text-gray-900 md:w-2/3 lg:w-1/2'>

                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-lg font-medium">Your Full Name:</label>
                    <input type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Full Name" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-lg font-medium">Your email</label>
                    <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Email" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-lg font-medium">Your password</label>
                    <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l block w-full p-2.5" placeholder='Enter Your Password' required />
                </div>
                <p className='text-red-600 mb-2'>{error}</p>
                <p className='pb-2'>Already have an account? Please <Link className='text-secondary font-semibold' to='/login'>Login</Link> Now!</p>

                <button type="submit" className="text-white btn btn-success btn-sm">Register</button>
            </form>
        </div>
    );
};

export default Register;