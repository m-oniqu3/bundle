import BoardView from "./components/BoardView";
import Greeting from "./components/Greeting";
import Navbar from "./components/Navbar";
import { useBoardContext } from "./context/useBoardContext";

export default function App() {
  const {
    state: { activeBoard },
  } = useBoardContext();
  return (
    <>
      <Navbar />
      {activeBoard ? <BoardView /> : <Greeting />}
    </>
  );
}
