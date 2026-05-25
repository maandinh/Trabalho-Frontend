import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Header from '../components/Header'
function Layout() {
    return (
    <>
        <Header/>
 
        <Outlet/>
    
    </>
    )
}

export default Layout;