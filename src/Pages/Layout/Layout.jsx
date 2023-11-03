import { Outlet } from "react-router"
import { ContainerHeader } from "../../Components/ContainerHeader/containerHeader"
import { Nav } from "../../Components/Nav/Nav"
import { Aside } from "../../Components/Aside/Aside"

export const Layout = () => {
    return (
        <>
            <ContainerHeader>
                <Nav />
                <Aside />
            </ContainerHeader>
            <div className='appContent' onClick={() => setUserOptionsOpen(false)}>
                <Outlet />
            </div>
        </>
    )
}
