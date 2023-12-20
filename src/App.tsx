import { Link, Navigate, Route, Routes } from "react-router-dom";
import HomeLoader from "@/routes/home/Loader";
import TemplateLoader from "@/routes/template//Loader";

import { Button } from "antd";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<HomeLoader />} />
        <Route path="/abc" element={<TemplateLoader></TemplateLoader>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Button type="primary">
        <Link to="/abc">abc</Link>
      </Button>
      <Button type="primary">
        <Link to="/">home</Link>
      </Button>
      <Button type="primary">
        <Link to="/aaa">404</Link>
      </Button>
    </>
  );
}

export default App;
