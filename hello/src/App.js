
import './App.css';
import Employee from './components/Employee';
import {useState} from 'react'

function App() {
  const [role, setRole] = useState('dev') //const [variableName, setVariableName] = useState(default value)
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ?( //we can do JavaScript logic in HTML if there is { } surrounding the code
        <div>
          <input type='text' onChange={(e) => {
            console.log(e.target.value) //to get what we actually typed in into the input
            setRole(e.target.value)
          }}/>
          <Employee name="Dakota" role="Boss"></Employee> 
          <Employee name="Walker" role={role}></Employee> 
          <Employee></Employee> 
        </div>
      ) : (
        <p>You cannot see the employees.</p>
      )}
    </div>
  );
}

export default App;
