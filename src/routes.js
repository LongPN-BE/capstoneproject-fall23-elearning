import { useRoutes } from "react-router";
import LangdingPage from "./pages/Home";


export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <LangdingPage />,
        }
    ]);
}