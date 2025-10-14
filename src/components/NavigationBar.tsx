import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function NavigationBar() {
	return (
		<div className="sticky top-0 flex w-full justify-center items-center py-6 bg-[#0a0a0a]">
			<NavigationMenu>
				<NavigationMenuList className="grid grid-cols-3 items-center w-full">
					{/* Left */}
					<div className="flex justify-start">
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
								<h3 className="fantasy-text [text-shadow:0_0_10px_rgba(255,255,255,0.4)] sm:text-md md:text-lg lg:text-xl xl:text-2xl whitespace-nowrap">Rosehammer Studios</h3>
							</Link>
						</NavigationMenuItem>
					</div>

					{/* Right */}
					<div className="flex justify-end">
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="#">About Us</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}

export default NavigationBar;
