"use client"
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState,useEffect } from 'react';
import ReactMarkdown from "react-markdown";



const ReadmePage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id;


    const [readme, setreadme] = useState(null);
    const [view, setview]       = useState("markdown");
    const [copied, setcopied] = useState(false);

    useEffect(() => {
      getReadme();
    }, [])
    

    const getReadme = async()=>{
      try {
        const res = await fetch(`/api/history/${id}`);
        const data  = await res.json();
        setreadme(data.readme);
        
      } catch (error) {
        console.error(error);
      }

    }

    const copyToClipboard = async ()=>{
      navigator.clipboard.writeText(readme.content);
      setcopied(true);
      setTimeout(() => {
        setcopied(false);
      }, 2000);
    }


    if (!readme) {
  return <div className="text-white p-5">Loading...</div>;
}
    
  return (
    <div className='text-white '>
        <div className='flex items-center gap-4'>
            <h1 onClick={()=>router.back()} className='cursor-pointer font-bold text-xl border-2 border-gray-500 bg-blue-400  px-2 rounded-2xl '> ← </h1>
            <div className='flex gap-4'>
                <h1 className='text-2xl font-semibold'>{readme.repoName}</h1>
                <div className=''> 
                <h1 className='text-lg font-semibold'>{readme.repoURL} 
                </h1>
                <span className='text-sm text-blue-500'> {new Date(readme.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div className='pl-15'>
              {copied ===false ?(
                <button onClick={()=>copyToClipboard()} className='px-4 p-2 border-2 border-gray-600 rounded-xl'>Copy</button>
              ):(

                <button className='px-4 p-2 border-2 border-gray-600 rounded-xl'>Copied</button>
              )}
            </div>
        </div>
                {/* priview of content */}
             <div className='text-white pt-5 pl-5'>
              <div className='flex justify-between items-center'>
              <h1 className='text-2xl'>Preview</h1>
              <div className='flex gap-4 pt-2'>
               { ["Markdown","Preview"].map(v=>{
                return(
        
                  <button key={v}onClick={()=>setview(v)} className='border-2 border-white p-2 rounded-2xl'>{v}</button>
                )
               })}
              </div>
              </div>
              
              <div className="pt-3">
          
            <div className="h-[450px] border-2 border-gray-600 rounded-lg overflow-y-auto p-5">
              {view === "Markdown" ? (
                <pre className="whitespace-pre-wrap break-words">
                  {readme.content}
                </pre>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{readme.content}</ReactMarkdown>
                </div>
              )}
            </div>
         
        </div>
        
            </div>
    </div>
  )
}

export default ReadmePage;