
import './App.css';
import Employee from './components/Employee';

function App() {
  console.log("We are about to list the employees");
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ?( //we can do JavaScript logic in HTML if there is { } surrounding the code
        <div>
          <Employee></Employee> 
          <Employee></Employee> 
          <Employee></Employee> 
          <Employee></Employee> 
          <Employee></Employee> 
        </div>
      ) : (
        <p>You cannot see the employees.</p>
      )}
    </div>
  );
}

export default App;
