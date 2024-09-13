import { Outlet, useLoaderData } from "react-router-dom";

import MarkAttendanceNavbar from "./markAttendanceNavbar";


export async function loader(){
    const res = await fetch('http://localhost:5011/api/v1/auth/coordinator', {
        method: 'GET',
        credentials: 'include',
    });
    const data = await res.json();
    const status = data?.status
    return data;
}

export default function MarkAttendanceLayout () {
    const user = useLoaderData()
    return(
        <>
            {
                user.status === 'success' &&
                (
                    <>
                        <div className="flex flex-col items-center min-h-screen bg-gray-100">
                            <div className="w-[95vw] md:w-[50vw] max-w-4xl">
                            <MarkAttendanceNavbar/>
                            <div className="mt-4">
                                <Outlet/>
                            </div>
                            </div>
                        </div> 
                    </>
                )
                    
            }            
            
        </>
    )
}


