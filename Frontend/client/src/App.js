
import './App.css';
import { useState } from 'react';
import AuthenticationPage from './Pages/AuthenticationPage';

function App() {
  const [isError, setError] = useState(false);

  return (
    <div className="App">
      <h1>MapleMark Media Internal Applications</h1>
      <div className="center-container">
        {!isError ? <AuthenticationPage /> : <h2>Login Successful</h2>}
      </div>
    </div>
    
  );
}

export default App;
