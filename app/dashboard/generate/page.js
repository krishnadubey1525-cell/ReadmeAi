"use client"
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import ReactMarkdown from "react-markdown"

const Generate = () => {
  const {data:session} = useSession();
    const [content, setcontent] = useState("")
    const [repoURL, setrepoURL] = useState("");
    const [tone, settone] = useState("Professional");
    const [projectType, setprojectType] = useState("Auto detect")
    const [view, setview] = useState("Markdown")

    const handleGenerate = async()=>{
      if(!repoURL){
        console.log("Please enter a GitHub URL")
        return;
      }
      setcontent("");

      try {
        const res = await fetch("/api/generate",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            repoURL,
            options :{tone,projectType}
          })
        })
        const data = await res.json();
        if(!res.ok){
          console.log(data.error);
          return
        }
        setcontent(data.content)
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>
    <div className='text-white'>
            <h1 className='text-2xl font-semibold'>Generate READMEs</h1>
        <section  className='flex gap-10 items-center '>
            <div className='flex flex-col pt-4 gap-2 pl-4 '>
                <label htmlFor="" className='text-lg'>GitHub repo URL -:</label>
                <input value={repoURL} onChange={(e)=>setrepoURL(e.target.value)} type="text" placeholder='https://github.com/user/repo' className='p-3 border-2 px-10 border-gray-600 rounded-2xl w-fit' />
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Project Type -:</label>
                <select  name="projectType" id=""value={projectType} onChange={(e)=>setprojectType(e.target.value)}>
                    <option className='text-gray-600'>Auto detect</option>
                    <option className='text-gray-600'>Web application</option>
                    <option className='text-gray-600'>API / Backend</option>
                    <option className='text-gray-600'>CLI tool</option>
                    <option className='text-gray-600'>Library / Package</option>
                </select>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="">Tone -:</label>
                <select name="tone" id=""value={tone} onChange={(e)=>settone(e.target.value)}>
                    <option className='text-gray-600' >Professional</option>
                    <option className='text-gray-600'>Casual & Freindly</option>
                    <option className='text-gray-600'>Minimal</option>
                  
                </select>
            </div>
            <button onClick={()=>handleGenerate()} className='border-2 border-gray-700 p-3 bg-green-500 rounded-2xl'>⚡ Generate README</button>
        </section>
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
      {/* priview of content */}
      <div className="pt-3">
  {!content ? (
    <div className="flex justify-center items-center h-[400px] border-2 border-gray-600 rounded-lg">
      Your README will appear here...
    </div>
  ) : (
    <div className="h-[400px] border-2 border-gray-600 rounded-lg overflow-y-auto p-5">
      {view === "Markdown" ? (
        <pre className="whitespace-pre-wrap break-words">
          {content}
        </pre>
      ) : (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  )}
</div>

    </div>
    </>
  )
}

export default Generate;