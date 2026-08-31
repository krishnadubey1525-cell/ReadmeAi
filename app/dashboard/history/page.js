"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const history = () => {
    const router = useRouter();
    const [readmes, setreadmes] = useState([]);

   useEffect(() => {
     fetchHistory();
   }, [])
   
    
    const fetchHistory = async()=>{
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setreadmes(data.readmes || []);

      } catch (error) {
        console.log(error);
        
      }

    }
  return (
    <div className='text-white'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Your READMEs</h1>
          <button className='text-xl font-semibold p-2 px-4 rounded-xl  border-gray-700 border-2'>+ New</button>
        </div>
        <section >
         {readmes.length === 0 && (
          <div className='flex items-center justify-center flex-col gap-10 pt-20 bg-slate-600 m-4 pb-4'>
            <div className='font-semibold text-2xl'>No READMEs generated yet</div>
            
            <button onClick={()=>router.push("/dasgboard/generate")} className='border-2 border-slate-700 p-2 px-6 rounded-xl'>Generate README</button>
            
          </div>
         )}
            <div className='flex gap-4 pt-5'>
              {readmes.map((readme)=>{
                return(
                  <div onClick={()=>router.push(`/dashboard/history/${readme._id}`)}  key={readme._id} className='border-2 border-white p-2 '>
                    <div className='flex gap-4'>
                    <div>
                    <h1 className='font-semibold text-xl text-green-500'>{readme.repoName}</h1>
                    <h2 className='text-sm text-blue-600'> {new Date(readme.createdAt).toLocaleDateString()}</h2>
                    </div>
                  <button onClick={(e)=>deleteReadme(e,readmes._id)} className='cursor-pointer'>🗑️</button>
                  </div >
                    <img  src="/github.png" alt="not found" className=' w-full bg-white h-35 object-contain' />
                  </div>
                )
               
               })}
           
         </div>
         
        </section>
        
    </div>
  )
}

export default history