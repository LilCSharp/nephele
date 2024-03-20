import { useState } from 'react';
import './App.css';
import Diagram from './DiagramContainer';
import NavBar from './Navbar';

function App() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleComponentCreationStart = () => {
    setIsCreating(true);
  }

  const handleComponentCreationEnd = () => {
    setIsCreating(false);
  }

  return (
    <div>
      <NavBar createFunction={handleComponentCreationStart}></NavBar>
      <Diagram isCreating={isCreating} createEnd={handleComponentCreationEnd}></Diagram>
    </div>
  );
}

export default App;
