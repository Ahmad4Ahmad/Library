import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout(props)
{
    return (
        <div className="layout">
            <Header></Header>
            <div className="row">
                    <Sidebar></Sidebar>
                    <div>{props.children}</div>
            </div>
        </div>
    )
}

export default Layout;