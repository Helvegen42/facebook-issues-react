import Issue from "./components/Issue";
import { Routes, Route } from "react-router-dom";
import IssuePage from "./components/IssuePage";
const App = () => {
  return (
    <div className='bg-[rgb(10,12,16)] h-full w-full'>
      <div className='flex flex-col items-center justify-center'>
        <Routes>
          <Route exact path='/issue/:number' element={<IssuePage />} />
          <Route exact path='/' element={<Issue />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
