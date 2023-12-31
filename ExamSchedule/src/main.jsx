import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import AddDepartment from './component/Department/AddDepartment.jsx'
import EditDepartment from './component/Department/EditDepartment.jsx'
import ViewDepartment from './component/Department/ViewDepartment.jsx'
import Dashboard from './component/DashBoard/Dashboard.jsx'
import AddProgram from './component/Program/AddProgram.jsx'
import EditProgram from './component/Program/EditProgram.jsx'
import ViewProgram from './component/Program/ViewProgram.jsx'
import AddCourse from './component/Course/AddCourse.jsx'
import EditCourse from './component/Course/EditCourse.jsx'
import ViewCourse from './component/Course/ViewCourse.jsx'
import AddSession from './component/Session/AddSession.jsx'
import EditSession from './component/Session/EditSession.jsx'
import ViewSession from './component/Session/ViewSession.jsx'
import AddOfferCourse from './component/OfferCourse/AddOfferCourse.jsx'
import EditOfferCourse from './component/OfferCourse/EditOfferCourse.jsx'
import ViewOfferCourse from './component/OfferCourse/ViewOfferCourse.jsx'
import AddStudent from './component/Student/AddStudent.jsx'
import EditStudent from './component/Student/EditStudent.jsx'
import ViewStudent from './component/Student/ViewStudent.jsx'
import AddRegisterCourse from './component/RegisterCourse/AddRegisterCourse.jsx'
import EditRegisterCourse from './component/RegisterCourse/EditRegisterCourse.jsx'
import ViewRegisterCourse from './component/RegisterCourse/ViewRegisterCourse.jsx'

const api = 'http://localhost/tez_exam/exam/index.php'

const route = createBrowserRouter(


  createRoutesFromElements(
    <Route path='/' element= {<Layout/>}>
      <Route path='' element = {<Dashboard api={api} />}/>
      <Route path='/department/add/:deptcode' element= {<AddDepartment api={api} />}/>
      <Route path='/department/edit' element= {<EditDepartment api={api} />}/>
      <Route path='/department/view' element= {<ViewDepartment api={api} />}/>

      <Route path='/programme/add/:pcode' element= {<AddProgram api={api} />}/>
      <Route path='/programme/edit' element= {<EditProgram api={api} />}/>
      <Route path='/programme/view' element= {<ViewProgram api={api} />}/>

      <Route path='/course/add/:code' element= {<AddCourse api={api}/>}/>
      <Route path='/course/edit' element= {<EditCourse api={api} />}/>
      <Route path='/course/view' element= {<ViewCourse api={api} />}/>

      <Route path='/session/add/:code' element= {<AddSession api={api}/>}/>
      <Route path='/session/edit' element= {<EditSession api={api} />}/>
      <Route path='/session/view' element= {<ViewSession api={api} />}/>

      <Route path='/offercourse/add/:offerid' element= {<AddOfferCourse api={api}/>}/>
      <Route path='/offercourse/edit' element= {<EditOfferCourse api={api}/>}/>
      <Route path='/offercourse/view' element= {<ViewOfferCourse api={api}/>}/>

      <Route path='/student/add/:stdcode' element= {<AddStudent api={api}/>}/>
      <Route path='/student/edit' element= {<EditStudent api={api}/>}/>
      <Route path='/student/view' element= {<ViewStudent api={api}/>}/>

      <Route path='/registercourse/add/:registcode' element= {<AddRegisterCourse api={api}/>}/>
      <Route path='/registercourse/edit' element= {<EditRegisterCourse api={api}/>}/>
      <Route path='/registercourse/view' element= {<ViewRegisterCourse api={api}/>}/>

    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {route}/>
    {/* <App/> */}
    {/* <Layout/> */}
  </React.StrictMode>
)
