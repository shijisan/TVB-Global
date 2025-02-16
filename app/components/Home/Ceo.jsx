import { FaQuoteLeft } from "react-icons/fa";


export default function HomeCeo() {
	return (
		<>
			<section className="w-full h-full bg-neutral-100">
				<div className="max-w-6xl min-h-[70vh] flex md:flex-row flex-col mx-auto">
					<div className="md:w-1/2 w-full flex justify-start items-center md:p-0 p-4">
						<img className="rounded-3xl" src="https://placehold.co/500/webp" alt="CEO photo" />
					</div>
					<div className="md:w-1/2 w-full flex justify-center items-center flex-col md:p-0 p-4">
						<div>
							<div className="md:ps-12 md:text-start text-center">
								<h1 className="md:text-5xl text-4xl poppins">The CEO</h1>
								<h1 className="md:text-3xl text-2xl poppins">Girlie Espenida Feratero</h1>
							</div>
							<FaQuoteLeft className="text-mustard md:size-10 size-6 mt-8 mb-4" />
							<p className="md:text-lg text-base leading-loose md:ps-12 ps-4"><span className="text-mustard">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}