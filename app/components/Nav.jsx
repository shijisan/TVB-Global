export default function(){
    return(
        <>
        <nav className="w-full top-0 left-0 z-50 fixed bg-maroon px-4 text-white">
            <div className="h-[10vh] w-full flex max-w-6xl mx-auto">
                <div className="w-1/2 flex justify-start items-center">
                    <img className="size-[8vh] me-2 drop-shadow" src="/logo.webp" alt="Logo of The VA BAR" />
                    <h1 className="text-4xl font-semibold poppins drop-shadow text-mustard">The VA BAR</h1>
                </div>
                <ul className="w-1/2 font-medium flex items-center justify-evenly">
                    <li>
                        <a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">Home</a>
                    </li>
                    <li>
                        <a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">About</a>
                    </li>
                    <li>
                        <a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">Courses</a>
                    </li>
                    <li>
                        <a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">Contacts</a>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    )
}
