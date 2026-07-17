import React ,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function ProtectedRoute({children,authentication=true}){
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authStatus=useSelector((state)=>state.auth.status);
    useEffect(()=>{
        if(authStatus !== authentication && authentication){
            navigate('/login');
        }else if(authStatus !== authentication && !authentication){
            navigate('/');
        }
        setLoader(false);

    },[authStatus,navigate,authentication]);
    return (
        loader?<div> loading...</div>: <>{children}</>
    )

}