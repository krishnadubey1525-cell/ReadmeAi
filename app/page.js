"use client";
import Image from "next/image";
import Link from "next/link";
import PricingCard from "@/components/PricingCard";
import { useSession ,signIn,signOut} from "next-auth/react";

export default function Home() {

  const {data:session} = useSession();
  return (
    <>
    <nav>
      <div className="bg-black text-white flex items-center justify-between px-10 p-2 font-bold">
       <Link href={"/"}>
        <h1 className="text-2xl text-green-400 px-5">ReadmeAI</h1>
      
       </Link>
      {!session &&
      <Link href={"/login"}>
      <h1 className="px-10 text-xl bg-blue-600 border-2 border-gray-800 rounded-full p-2">Login </h1>
      </Link>
      }
      {session &&
      <button>
      <h1 className="px-10 text-xl bg-blue-600 border-2 border-gray-800 rounded-full p-2" onClick={()=>signOut()}>Logout </h1>
        </button>
      
      }
      </div>
    </nav>
    <section>
      <div className="w-full border-2 border-slate-600 h-80 justify-center flex pt-10 bg-black text-white">
        <div className="flex flex-col gap-4 items-center " >
        <h1 className="text-4xl  font-bold ">Generate Readme's With AI</h1>
        <h3 className="text-sm">Paste your GitHub repo URL and get a professional,structured <br/> <span className="pl-9">README instantly.
           No more blank page anxiety.</span></h3>

           <div className="pt-5 flex items-center justify-center gap-3 ">
            <input type="text" placeholder="https://github.com/your/repo" className="  border-white p-2 border-2 rounded-full px-8 m-0 " />
            <button className="bg-blue-800 w-full p-2 rounded-xl"> Generate Free</button>
           </div>

           <h3 className="text-sm pt-2">3 free generations - no credit card required </h3>
        </div>
      </div>
      <div className="bg-black border-2 border-white text-white flex items-center justify-center h-45 gap-2">
          <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="font-bold text-xl">Instant generation</h1>
            <h3 className="w-1/2 text-center">Paste a URL.. get a full README with
            badges,usages ,installation
            in 10 seconds</h3>
          </div>
          <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="font-bold text-xl">Edit and customize</h1>
            <h3  className="w-1/2 text-center">live markdown preveiw - edit the output and copy with one click</h3>
          </div>
          <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="font-bold text-xl">Save your history</h1>
            <h3  className="w-1/2 text-center">All your generated README saved to your account, searchable anytime</h3>
          </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center">
        <h1>Simple Pricing</h1>
        <h3>Start free,upgrade when you need more</h3>

        <div>
          
        </div>

      </div> */}
      <PricingCard/>
    </section>
    </>
    
  );
}
