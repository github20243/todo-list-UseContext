import { useContext } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import { MyContext } from "./context/Context";

function App() {
	const { state } = useContext(MyContext);
	return (
		<>
			<Wrapper />
		</>
	);
}

export default App;
