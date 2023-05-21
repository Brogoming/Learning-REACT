import './App.css';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Employee from './components/Employee';
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import Header from './components/Header'

function App() {
  const [role, setRole] = useState('dev') //const [variableName, setVariableName] = useState(default value)
  const [employees, setEmployees] = useState(
    [
      {id: 1, name: "Dakota", role: "Developer", img: "https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {id: 2, name: "Sal", role: "Developer", img: "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {id: 3, name: "John", role: "Developer", img: "https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {id: 4, name: "Melanie", role: "Developer", img: "https://images.pexels.com/photos/3460478/pexels-photo-3460478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {id: 5, name: "Corey", role: "Developer", img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {id: 6, name: "Jake", role: "Developer", img: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    ]
  )

  function updateEmployee(id, newName, newRole){
    const updatedEmployees = employees.map((employee) => {
      if(id == employee.id){
        //return new employee
        return {...employee, name: newName, role: newRole}
      }
      return employee
    })
    setEmployees(updatedEmployees)
  }

  function newEmployee(name, role, img){
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img
    }
    setEmployees([...employees, newEmployee]) //this will take each employee and put it in the list
  }

  const showEmployees = true;
  return (
    <div className='App bg-gray-300 min-h-screen'>
      <Header />
      {showEmployees ?( //we can do JavaScript logic in HTML if there is { } surrounding the code
        <>
          <div className="flex flex-wrap justify-center my-2">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee 
                  id={employee.id} 
                  name={employee.name} 
                  role={employee.role} 
                  updateEmployee={updateEmployee}
                />
              );
              return(
                <Employee 
                  key={employee.id}
                  id={employee.id}
                  name={employee.name} 
                  role={employee.role} 
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            }) /*this is a function on the array that allows us to go through th elements*/}
          </div>
          <AddEmployee newEmployee={newEmployee}/>
        </>
      ) : (
        <p>You cannot see the employees.</p>
      )}
    </div>
  );
}

export default App;
