import React, { useState } from 'react'
import Layout from '../layout/Layout'
import { createNote } from './auth/context/apiContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function CreateNote() {
    const[data, setData] = useState({
        title:"",
        description:""
    });
    const navigate = useNavigate();

    function handleInput(e){
        // console.log(e.target.value);
        setData({...data, [e.target.name]:e.target.value});
    }

    const response = async () => {
        const res = await createNote(data);
        toast.success(res.data.message, {autoClose:1500});
    }

    const handleSubmit = ()=> {
        response();
        navigate("/home");
    }

  return (
    <Layout>
        <div className="row p-5">
                <div className="col-md-3"></div>
                <div className="col-md-6 p-4 m-5 border border-2 border-success rounded text-info bg-dark">
                    <form className='formtext' onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label ">Title</label>
                            <input type="text"
                                name='title' onChange={handleInput}
                                className="form-control bg-transparent border-0 border-bottom border-success border-2 text-light"
                                placeholder='Enter your title' />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label ">Description</label>
                            <input type="text" onChange={handleInput}
                                name='description'
                                className="form-control bg-transparent border-0 border-bottom border-success border-2 text-light"
                                placeholder='Enter your description' />
                        </div>

                        <button type="submit" className="btn btn-success">Add to list</button>
                    </form>
                </div>
                <div className="col-md-3">

                </div>
            </div>
    </Layout>
  )
}

export default CreateNote