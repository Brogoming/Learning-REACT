
import './App.css';
import Employee from './components/Employee';
import {useState} from 'react'

function App() {
  const [role, setRole] = useState('dev') //const [variableName, setVariableName] = useState(default value)
  const showEmployees = true;
  return (
    <div class='App'>
      {showEmployees ?( //we can do JavaScript logic in HTML if there is { } surrounding the code
        <>
          <input type='text' onChange={(e) => {
            console.log(e.target.value) //to get what we actually typed in into the input
            setRole(e.target.value)
          }}/>
          <div class="flex flex-wrap justify-center">
            <Employee name="Dakota" role="Boss" img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee name="Walker" role={role} img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee name="Dakota" role="Boss" img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee name="Walker" role={role} img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee name="Dakota" role="Boss" img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee name="Walker" role={role} img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
            <Employee img="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"></Employee> 
          </div>
        </>
      ) : (
        <p>You cannot see the employees.</p>
      )}
    </div>
  );
}

export default App;
