import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { useAuth } from './auth/context/auth';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteNote, getNotes } from './auth/context/apiContext';
import NotesDescription from './NotesDescription';

function Home() {
    const[auth, setAuth] = useAuth();
    const[data, setData] = useState([]);
    const[selectedTitle, setSelectedTitle] = useState('');
    const[selectedDescription, setSelectedDescription] = useState('');
    const navigate = useNavigate();
    
    async function getData(){
      const response = await getNotes();
        setData(response.data.result);
    }
    useEffect(()=>{
      getData();
    },[data])

    async function handleDelete(_id){
      const res = await deleteNote(_id);
      await getData();
      toast.success(`${res.data.message}`, {autoClose:200});
    }

    function handleDetails(title, description){
      setSelectedTitle(title);
      setSelectedDescription(description);
    }

    function setToLocalStorage(_id, title, description){
      localStorage.setItem("id", _id);
      localStorage.setItem("title", title);
      localStorage.setItem("description", description);
      navigate("/update");
    }

  return (
    <Layout>

        <NotesDescription
        title={selectedTitle}
        description={selectedDescription}
        />

<div className='d-flex align-items-center flex-column justify-content'>
<button className='btn btn-success mx-0 my-2 w-100 ' style={{height:"auto"}} 
onClick={()=>navigate("/create")}> <BsPlusLg style={{padding:"0px"}} /><span> Add new note</span></button>
  
{
  data ?
 <table className="table table-hover table-dark table-striped mx-auto">
                <thead>
                    <tr>
                    {/* <th rowSpan={data.length} style={{verticalAlign:"middle", textAlign:"center", width:"100px"}}><button className='btn btn-success mx-0'
                                    style={{height:"auto"}}
                                    onClick={()=>navigate("/create")}> <BsPlusLg style={{padding:"0px"}} /></button></th> */}
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.slice().reverse().map((item, i) => {
                            let { _id, title, description } = item
                            return (
                                <tr key={_id}>
                                  {/* {
                                    i === 0 ?
                                    <td rowSpan={data.length} style={{verticalAlign:"middle", textAlign:"center", width:"100px"}}><button className='btn btn-success mx-0'
                                    style={{height:"auto"}}
                                    onClick={()=>navigate("/create")}> <BsPlusLg style={{padding:"0px"}} /></button></td>
                                  : null} */}
                                    <th>{i + 1}</th>
                                      <td>
                            {/* modal trigger */}
                      <div
                      style={{cursor:"pointer"}}>
                          <button
                          data-bs-toggle="modal" data-bs-target="#myModal"
                          onClick={()=>[handleDetails(title, description)]} 
                          style={{textDecoration:"none", color:"white", background:"none", border:"none"}}>
                            {title}
                          </button>
                      </div>
                                      </td>
                                    <td><div className="btn-group" role="group">
                                        {/* update button */}
                                        <button
                                            onClick={() => setToLocalStorage(_id, title, description)}
                                            className='btn btn-outline-success'
                                            style={{ boxShadow: "0px 2px .5px 0px rgb(8, 250, 100)", color:"green"}}>
                                            <Link to="/update"
                                                style={{ color: "rgb(8, 250, 100)", textDecoration: "none" }}
                                            ><FaRegEdit /></Link> </button>

                                        {/* delete button */}
                                        <button 
                                        onClick={() => {
                                            if (window.confirm("Are you sure?")) {
                                                handleDelete(_id);
                                            }
                                        }
                                        } className='btn btn-outline-danger' style={{ boxShadow: "0px 2px 2px 0px red", color:"red" }}> <MdDelete /> </button>
                                    </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> 
            : null }
            </div>
            
    </Layout>
  )
}

export default Home