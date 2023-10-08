import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Blog from './components/Blog';
function App() {
  return (
    <div className="App">
      <Navbar title="CodeWithAsh "/>
      {/* <Login text="hy my name is ashutosh"/> */}
      <Blog/>
    </div>
  );
}

export default App;


