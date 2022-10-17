
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { Add } from "./pages/Add";
import { Books } from "./pages/Books";
import { Update } from "./pages/Update";

import "./style.css"

const router=createBrowserRouter([
  {
    path:"/",
    element:<Books/>
  },
  {
    path:"/add",
    element:<Add/>
  },
  {
    path:"/update/:id",
    element:<Update/>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
