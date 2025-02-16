export default function AdminSidebar() {
    return (
        <>
        <aside className="w-1/5 rounded-xl drop-shadow bg-white h-[80vh] max-h-[80vh] py-2 border">
            <ul className="flex flex-col items-center h-full poppins font-medium">
                <li className="block w-full text-center">
                    <a className="w-full h-full block py-4 hover:backdrop-brightness-90 transition-all hover:text-mustard" href="/admin/dashboard">Dashboard</a>
                </li>
                <li className="block w-full text-center">
                    <a className="w-full h-full block py-4 hover:backdrop-brightness-90 transition-all hover:text-mustard" href="/admin/admins">Admins</a>
                </li>
            </ul>
        </aside>
        </>
    );
}