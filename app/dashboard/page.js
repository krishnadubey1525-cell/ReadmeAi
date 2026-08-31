"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function DashboardPage() {
  const {data:session} = useSession();
  const [readme, setreadme] = useState([]);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    
   fetchData();
  }, [])
  

  const fetchData = async()=>{
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
  
      setreadme(data.readmes || []);
    } catch (error) {
      console.log(error);
    }
  }
  const usageLimit = session?.user?.plan === "pro" ? "Unlimited" : "3"
  const usageCount = session?.user?.usageCount || 0

  return (
    <div className="text-white ">
      <div className=" text-white flex flex-col gap-8">
        <div>
          <h1 className="font-bold text-2xl pl-25 pt-5">Welcome Back </h1>
        </div>
        <div className="flex gap-13 items-center pl-25 ">
          <div className="p-4 px-8 py-7 rounded-2xl bg-slate-600 flex flex-col gap-1 ">
            <h1>README's Genearted</h1>
            <h1 className="font-bold text-2xl">{readme.length}</h1>
            <h1>This Month </h1>
          </div>
          <div className="p-4 px-6 rounded-2xl bg-slate-600 flex flex-col gap-1  ">
            <h1>Usage This Month</h1>
            <h1 className="font-bold text-2xl">{usageCount} / {usageLimit}</h1>
            <h1 > <span className="text-blue-500">Free plan </span> - Upgrade for <br />Unlimited </h1>
          </div>
          <div className="p-4 px-10 py-7 rounded-2xl bg-slate-600  flex flex-col gap-1 ">
            <h1>Current Plan</h1>
            <h1 className="text-xl text-green-400 font-bold">{session?.user?.plan === "pro" ? " Pro" : "Free"}</h1>
            <h1 className="text-blue-500">{session?.user?.plan === "free" ? " Upgrade to Pro" : "Suscribed"}
             </h1>
          </div>
        </div>

      </div >
      <div className="pl-25 pt-5" >
        <h1 className="font-semibold text-xl">RECENT READMEs</h1>
        <div>
        {loading && (
          <div className="pt-20 text-2xl pl-5">Loading...</div>
        )}
        {!loading && readme.length===0 &&(
          <div className="flex flex-col items-center pt-8 text-2xl gap-8 font-semibold">
            <h1>No READMEs yet</h1>
            <div>
              <Link href={"/dashboard/generate"}>
              <button className="p-2 bg-green-500 rounded-2xl border-2 border-slate-700">Generate READMEs</button>
              </Link>
            </div>
          </div>
        )}


        {!loading && (
          readme.map((e)=>(

          <div key={e._id} className="pt-2">
          <div className="flex pt-1 gap-4 border-2 border-white pl-4 pb-2 rounded-2xl">
            <div className="bg-white rounded-2xl border-white border-2 ">
            <img src="/github.png" alt="" className="w-12" />
            </div>
            <div>
             <h1 className="text-xl text-green-500 " >{e.repoName}</h1>
             <h1 className="text-sm text-blue-600">github.com</h1>
            </div>
          </div>
          </div>
          ))
          
         
        )}

        </div>
        

      </div>
    </div>
  );
}