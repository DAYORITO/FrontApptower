import { Outlet } from "react-router"
import { ContainerHeader } from "../../Components/ContainerHeader/containerHeader"
// import { Nav } from "../../Components/Nav/Nav"
import { Aside } from "../../Components/Aside/Aside"
// import { AsideBarMenu } from "../../Components/AsidebarMenu/AsideBarMenu"

export const Layout = () => {
    return (
        <>
            <ContainerHeader>
                <Aside/>
                <div className='appContent' onClick={() => setUserOptionsOpen(false)}>
                    <Outlet />
                </div>
            </ContainerHeader>
        </>
    )
}
