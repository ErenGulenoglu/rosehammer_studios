import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AvatarMenu from "./AvatarMenu";
import { useAuth } from "../components/AuthContext";

function NavigationBar() {
	const { user } = useAuth();
	return (
		<div className="sticky top-0 flex w-full justify-center items-center py-6 bg-[#0a0a0a]">
			<NavigationMenu>
				<NavigationMenuList className="grid grid-cols-3 items-center w-full">
					{/* Left */}
					<div className="flex justify-center">
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/lota">The Land of the Awakened</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</div>

					{/* Center (perfectly centered trademark/logo) */}
					<div className="flex justify-center">
						<NavigationMenuItem>
							<Link to="/">
								<h3 className="fantasy-text [text-shadow:0_0_10px_rgba(255,255,255,0.4)] sm:text-lg md:text-xl lg:text-2xl xl:text-2xl whitespace-nowrap">Rosehammer Studios</h3>
							</Link>
						</NavigationMenuItem>
					</div>

					{/* Right */}
					<div className="flex justify-center">
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="#">About Us</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
			{user ? (
				<div className="absolute right-[10%]">
					<AvatarMenu />
				</div>
			) : (
				// <p className="absolute right-[10%]">asd</p>
				<Link className="absolute right-[10%]" to="/login">
					<Button className="cursor-pointer" variant={"outline"}>
						Login
					</Button>
				</Link>
			)}
		</div>
	);
}

export default NavigationBar;
