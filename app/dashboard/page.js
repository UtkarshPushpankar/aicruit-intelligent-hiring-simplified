"use client";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import RoleUpdationForm from "@/components/RoleUpdationForm";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect to login if unauthenticated once we know the status.
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Show a loading message while the session is loading.
    if (status === "loading") {
        // return <div>Loading...</div>;
        return <Loader className="flex justify-center items-center" />;
    }

    const srcUserImage = session?.user?.image

    // If there's no session, this will never run because of the redirect above.
    return (
        <>
            <div>
                <div className="top flex justify-between m-6 p-4">
                    <div className="greetings flex items-center gap-4">
                        <img className="rounded-full" height={40} width={40} src={srcUserImage} alt="" />
                        <p className="text-4xl poppins text-gradient">Hello! {session?.user?.name}</p>
                    </div>

                    <button onClick={() => signOut()} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
                </div>

                <RoleUpdationForm/>
            </div>
        </>
    );
};

export default Dashboard;
