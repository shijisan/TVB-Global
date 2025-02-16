import HomeHeader from "./components/Home/Header";
import HomeAbout from "./components/Home/About";
import HomeCeo from "./components/Home/Ceo";
import HomeEmployees from "./components/Home/Employees";

export default function Home() {
	return (
		<>
		<main className="bg-neutral-100 pattern">
			<HomeHeader />
			<HomeAbout />
			<HomeCeo />
			<HomeEmployees />
		</main>
		</>
	);
}
