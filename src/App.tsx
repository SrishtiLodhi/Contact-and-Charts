import Dashboard from "./components/chartsAndMaps/Dashboard";
import { Sidebar } from "./components/componentsIndex";
import { Routes, Route } from "react-router-dom";
import ContactPage from "./Pages/ContactPage";

function App() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 pl-72">
				<Routes>
					<Route path="/" element={<ContactPage />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
