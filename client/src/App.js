import {Routes, Route} from "react-router-dom";
import HomePage from './component/HomePage';
import Reg from './component/Register';
import Login from './component/Login';
import DaschboardUser from './component/DaschboardUser';
import Profile from './component/profile'
import EditProfile from "./component/editprofile";
import DeleteUser from "./component/AA/deleteAccount";
import About from "./component/About";
import AddPost from "./component/AddPost/AddPost";
import EditPost from "./component/editPost";
import Maps from "./component/maps";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Reg/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/travelex' element={<DaschboardUser/>}/>
        <Route path='/User/:id' element={<Profile/>} />
        <Route path='/User/:id/edit' element={<EditProfile/>} />
        <Route path='/User/:id/delete' element={<DeleteUser/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/addpost' element={<AddPost/>} />
        <Route path='/Post/:id/edit' element={<EditPost/>} />
        <Route path='/maps' element={<Maps/>} />
      </Routes>
    </div>
  );
}

export default App;
