import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="bg-black text-white h-screen w-64 fixed top-0 left-0 overflow-y-auto shadow-lg">
			<div className="p-5">
				<ul className="space-y-2">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								`block py-2 px-4 rounded transition-colors duration-300 hover:bg-gray-800 hover:text-blue-500 ${
									isActive ? "bg-gray-800 text-blue-500 font-semibold" : ""
								}`
							}>
							Contact
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard"
							className={({ isActive }) =>
								`block py-2 px-4 rounded transition-colors duration-300 hover:bg-gray-800 hover:text-blue-500 ${
									isActive ? "bg-gray-800 text-blue-500 font-semibold" : ""
								}`
							}>
							Charts and Maps
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
