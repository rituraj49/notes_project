import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useAuth } from './context/auth';
import { loginUser } from './context/apiContext';
import { NavLink } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const[auth, setAuth] = useAuth();
    const [visibility, setVisibility] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    function handleInput(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(data);
        try {
            let result = await loginUser(data);
            console.log(result);
            
            if (result.status === 200) {
                if (result.data.success) {
                    toast.success(result.data.message, {
                        autoClose: 1000,
                        position: 'top-right',
                        style: { border: "1px", backgroundColor: "black", color: "aliceblue" }
                    });
                    setAuth({
                        ...auth,
                        user:result.data.user,
                        token:result.data.token
                    });
                    localStorage.setItem("auth", JSON.stringify(result.data));
                        navigate("/home");
                }
                else if (!result.data.success) {
                    toast.warning(result.data.message, {
                        duration: 1000,
                        style: { backgroundColor: 'black', color: "white" }
                    })
                }
            }
            else if(result.status === 202){
                toast.error(result.data.message,"error")
            }
            else  {
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
                <div className="col-md-6 p-4 m-5 border border-2 border-info rounded text-info formbg">
                    <form className='formtext' onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label ">Email address</label>
                            <input type="email"
                                name='email' value={data.email}
                                onChange={handleInput}
                                className="form-control bg-transparent border-0 border-bottom border-success border-1" aria-describedby="emailHelp"
                                placeholder='Enter your email' />
                            {
                                !data.email && 
                                <div id="name" className="form-text">Email is required</div>
                            }
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
                                    visibility ? <AiFillEye style={{cursor:"pointer"}} className='align-self-center' onClick={handleVisibility} /> : <AiFillEyeInvisible style={{cursor:"pointer"}} className='align-self-center' onClick={handleVisibility} />
                                }

                            </div>
                        </div>
                        <div className="mb-3">
                            <NavLink to="/register" className="text-muted">Register here</NavLink>
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
                <div className="col-md-3">

                </div>
            </div>
    </Layout>
  )
}

export default Login