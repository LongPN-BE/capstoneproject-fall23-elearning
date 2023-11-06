import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

function StudentPrivateRouter() {
  let auth = JSON.parse(Cookies.get("user"));
  if (auth && auth.role === "student") {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}

export default StudentPrivateRouter;
