import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({children}){
    return(
        <div className=" flex ">
            <Sidebar/>
            <main className="flex-1 p-4 px-15 bg-black">
                {children}
            </main>
        </div>
    )
}