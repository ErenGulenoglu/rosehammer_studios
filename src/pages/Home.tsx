import "../components/global.css";
import NavigationBar from "../components/NavigationBar";
import NavigationBarMobile from "../components/NavigationBarMobile";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import banner from "../assets/oath_of_the_horatii.png";

function Home() {
	useEffect(() => {
		document.title = "Home | Rosehammer Studios";
	}, []);

	return (
		<div>
			<div className="sticky top-0 hidden md:block">
				<NavigationBar />
			</div>
			<div className="sticky top-0 block md:hidden">
				<NavigationBarMobile />
			</div>

			<div className="w-full flex items-center justify-center">
				<div
					className="flex flex-col w-[85%] items-center justify-center gap-6 py-60  bg-cover bg-center bg-no-repeat bg-blend-overlay bg-[#181818] rounded-lg md:py-75"
					style={{ backgroundImage: `url(${banner})` }}
				>
					<h1 className="fantasy-text text-white text-4xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl">Somnium</h1>
					<h3 className="fantasy-text w-[75%] text-white italic text-center text-sm sm:text-md md:text-lg lg:text-xl xl:text-xl">
						The apocalypse has long since come, the Wanderer has forgotten to claim their souls, and now they struggle to be reborn from their own ashes.
					</h3>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Home;
