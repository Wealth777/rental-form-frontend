import { Route, Routes } from "react-router-dom"
import WelcomePage from "./page/WelcomePage"
import Form from "./page/Form"
import Successfull from "./page/Successfull"
import PageNotFound from "./page/PageNotFound"
import Register from "./page/auth/Register"
import Login from "./page/auth/Login"
import Dashboar from "./page/Dashboar"
import DashboardAlt from "./page/DashboardAlt"

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<WelcomePage />} />
        <Route path={'/propertyform'} element={<Form />} />
        <Route path={'/success'} element={<Successfull />} />
        <Route path={'*'} element={<PageNotFound />} />

        <Route path={'/admin/reg'} element={<Register />} />
        <Route path={'/admin/login'} element={<Login />} />
        <Route path={'/admin/'} element={<Dashboar />} />
        <Route path={'/admin/pre'} element={<DashboardAlt />} />
      </Routes>
    </>
  )
}

export default App
