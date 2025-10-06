import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";

import { Link } from "react-router-dom";

function NavigationBarMobile() {
	return (
		<div className="sticky top-0 flex w-full justify-center items-center py-6 bg-[#0a0a0a]">
			<NavigationMenu>
				<NavigationMenuList className="grid grid-cols-3 items-center w-full">
					{/* Left */}
					<div className="flex justify-center">
						<NavigationMenuItem>
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline">
										<Menu size={28} className="cursor-pointer" />
									</Button>
								</SheetTrigger>
								<SheetContent side="left">
									<SheetHeader>
										<SheetTitle>Sidebar Navigation</SheetTitle>
									</SheetHeader>
									<div className="grid flex-1 auto-rows-min gap-6 px-4">
										<div className="grid gap-3">
											<Link to="#">
												<Button variant="outline" className="w-full">
													About
												</Button>
											</Link>
										</div>
										<div className="grid gap-3">
											<Link to="/lota">
												<Button variant="outline" className="w-full">
													The Land of the Awakened
												</Button>
											</Link>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</NavigationMenuItem>
					</div>

					{/* Center (perfectly centered trademark/logo) */}
					<div className="flex justify-center">
						<NavigationMenuItem>
							<Link to="/">
								<h3 className="fantasy-text sm:text-md md:text-lg lg:text-xl xl:text-2xl whitespace-nowrap">Rosehammer Studios</h3>
							</Link>
						</NavigationMenuItem>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}

export default NavigationBarMobile;
