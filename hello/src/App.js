
import './App.css';
import Employee from './components/Employee';
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

function App() {
  const [role, setRole] = useState('dev') //const [variableName, setVariableName] = useState(default value)
  const [employees, setEmployees] = useState(
    [
      {name: "Dakota", role: "Developer", img: "https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {name: "Sal", role: "Developer", img: "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {name: "John", role: "Developer", img: "https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {name: "Melanie", role: "Developer", img: "https://images.pexels.com/photos/3460478/pexels-photo-3460478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {name: "Corey", role: "Developer", img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {name: "Jake", role: "Developer", img: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    ]
  )
  const showEmployees = true;
  return (
    <div className='App'>
      {showEmployees ?( //we can do JavaScript logic in HTML if there is { } surrounding the code
        <>
          <input type='text' onChange={(e) => {
            console.log(e.target.value) //to get what we actually typed in into the input
            setRole(e.target.value)
          }}/>
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              return(
                <Employee 
                  key={uuidv4()}
                  name={employee.name} 
                  role={employee.role} 
                  img={employee.img}
                />
              );
            }) /*this is a function on the array that allows us to go through th elements*/}
          </div>
        </>
      ) : (
        <p>You cannot see the employees.</p>
      )}
    </div>
  );
}

export default App;
