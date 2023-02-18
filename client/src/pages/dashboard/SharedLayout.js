import { Outlet } from 'react-router-dom'
import Wrapper from "../../assets/wrappers/dashboard"
import {Header, SideNav, Footer} from "../../components/dashboard"



const SharedLayout = () => {
  return (
    <Wrapper>
        <Header/>
            <Outlet/>
        <SideNav/>
        <Footer />
    </Wrapper>
    
  )
}

export default SharedLayout