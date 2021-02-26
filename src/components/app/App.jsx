import './App.css';
import AppContextProvider from '../../context/AppContextProvider'
import Menu from '../menu/Menu'
import Calendar from '../calendar/Calendar'

const App = () => {
  return (
    <div className="App">
      <AppContextProvider>
        <Menu />
        <Calendar />
      </AppContextProvider>
    </div>
  );
}

export default App;
