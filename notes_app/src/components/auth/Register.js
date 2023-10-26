import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { registerUser } from './context/apiContext';

function Register() {
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleInput(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let result = await registerUser(data);
            console.log(result);

            if (result.data.success) {
                if (result.status === 201) {
                    toast.success(result.data.message, {
                        duration: 1000,
                        position: 'top-right',
                        style: { border: "1px", backgroundColor: "black", color: "aliceblue" }
                    });
                }
                else if (result.status === 200) {
                    toast.warning(result.data.message, {
                        duration: 1000,
                        style: { backgroundColor: 'black', color: "white" }
                    })
                    // console.log(result.data);
                }
                setTimeout(() => {
                    navigate("/login")
                }, 500)
            }
            else {
                toast.error(result.data.error, {
                    duration: 1000,
                    style: { backgroundColor: 'black', color: "gray" }
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    function handleVisibility() {
        setVisibility(!visibility);
    }

    return (
        <Layout>
            <div className="row p-5">
                <div className="col-md-3"></div>
                <div className="col-md-6 p-4  rounded text-info formbg">
                    <form className='formtext' onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label ">Name</label>
                            <input type="text"
                                name='name' value={data.name}
                                onChange={handleInput}
                                className="form-control bg-transparent border-0 border-bottom border-success border-1" 
                                placeholder='Enter your name' />
                                {
                                    !data.name && 
                                <div id="name" className="form-text">Name is required</div>
                                }
                        </div>

                        <div className="mb-3">
                            <label className="form-label ">Email address</label>
                            <input type="email"
                                name='email' value={data.email}
                                onChange={handleInput}
                                className="form-control bg-transparent border-0 border-bottom border-success border-1" aria-describedby="emailHelp"
                                placeholder='Enter your email' />
                            {
                                !data.email && 
                                <div id="name" className="form-text">Please enter a valid email</div>
                            }
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className='d-flex flex-row '>
                                <input type={`${visibility ? "password" : "text"}`}
                                    name='password' value={data.password}
                                    onChange={handleInput}
                                    className="form-control bg-transparent border-0 border-bottom border-success border-1 align-self-center"
                                    autoComplete='current-password'
                                    placeholder='Enter your password'
                                />
                                {
                                    visibility ? <AiFillEye className='align-self-center' onClick={handleVisibility} /> : <AiFillEyeInvisible className='align-self-center' onClick={handleVisibility} />
                                }

                            </div>
                                {
                                    !data.password &&
                                    <div id="name" className="form-text">Please set a password</div>
                                }
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-md-3">

                </div>
            </div>
        </Layout>
    )
}

export default Register