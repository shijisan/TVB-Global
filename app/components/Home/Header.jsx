export default function HomeHeader() {
    return (
        <>
            <header className="w-full min-h-[90vh] flex justify-center items-center md:pt-[10vh] pt-[15vh]">
                <div className="max-w-6xl w-full mx-auto flex md:flex-row flex-col rounded-2xl md:p-[5vh]">
                    <div className="md:w-1/2 w-full justify-center md:items-center items-end flex md:text-start text-center md:h-auto md:p-0 p-4">
                        <div className="max-w-sm">
                            <div className="poppins md:text-7xl text-5xl font-semibold text-mustard ">
                                <h1 className="hover:cursor-pointer tracking-widest hover:brightness-110">REACH, CONNECT</h1>
                                <h1 className="hover:cursor-pointer hover:brightness-110">DISCOVER,</h1>
                                <h1 className="hover:cursor-pointer md:text-8xl text-6xl hover:brightness-110">MAKE IT</h1>
                                <h1 className="hover:cursor-pointer md:text-8xl text-6xl hover:brightness-110">HAPPEN</h1>
                            </div>
                            <div className="my-8">
                                <p>
                                    Here, at The VA BAR, We value every learning step of your learning journey - Join us and succeed globally!
                                </p>
                            </div>
                            <div>
                                <button className="btn-primary">
                                    Explore Opportunities
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full justify-center items-center flex flex-col">
                        <img className="drop-shadow md:h-auto h-[24vh]" src="header-2.webp" alt="" />
                    </div>
                </div>
            </header>
        </>
    )
}