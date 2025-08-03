"use client"

import { useAuth } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AdminPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    if(user?.role !== 'ADMIN'){
       router.push('/admin/dashboard');
    }else{
        router.push('/admin/login');
    }
    return (
        <div>
            <h1>Admin Page</h1>
        </div>
    );
};
export default AdminPage;