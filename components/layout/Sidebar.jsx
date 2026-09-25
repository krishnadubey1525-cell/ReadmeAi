"use client"
import React from 'react'

import Link from 'next/link'
import { useSession ,signIn,signOut} from "next-auth/react";

const Sidebar = () => {

  return (
    <div className='h-screen bg-black w-[22%] flex flex-col gap-5 border-2 border-white'>
      <div className=' p-3 pl-5 pt-6
      '>
        <h1 className='text-green-400 text-3xl font-bold'>ReadmeAI</h1>
    
      </div>
      <div className='pt-5 pl-5'>
        <ul className='text-white flex flex-col gap-5 pb-8'>
            <Link href={"/dashboard"}>
           <button className=' p-2 px-6 rounded-xl bg-gray-500 font-bold'>Dashboard</button>
            </Link>
            <Link href={"/dashboard/generate"}>
            <button className=' p-2 px-7.5 rounded-xl bg-gray-500 font-bold'>Generate</button>
            </Link>
            <Link href={"/dashboard/history"}>
           <button className='  p-2 px-9 rounded-xl bg-gray-500 font-bold'>History</button>
            </Link>
            <Link href={"/dashboard/billing"}>
           <button className='  p-2 px-9 rounded-xl bg-gray-500 font-bold'>Billing</button>
            </Link>
        </ul>
      </div>
      <hr className='border-2 border-white'/>
      <div className='text-white pl-3 pt-10'>
        <button>
             <h1 className="px-10 text-xl bg-blue-600 border-2 border-gray-800 rounded-full p-2" onClick={()=>signOut()} >Logout </h1>
        </button>
      </div>
    </div>
  )
}

export default Sidebar