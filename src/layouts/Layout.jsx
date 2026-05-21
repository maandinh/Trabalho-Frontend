import { Outlet } from "react-router";
import Menu from "../components/Menu";

function Layout() {
    return (
    <>
        <Menu/>
 
        <Outlet/>
    
    </>
    )
}

export default Layout;