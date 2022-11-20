
import './App.css';
import Home from './Pages/Home';
import AuthContext from './Context/AuthContext';
import PostDataToFirebase from './Components/PostDataFirebase/PostDataToFirebase';
import CompleteFirebase from './Pages/CompleteFirebase/CompleteFirebase';


function App() {
  return (
    <AuthContext >
      <CompleteFirebase />
    </AuthContext>
  );
}

export default App;
