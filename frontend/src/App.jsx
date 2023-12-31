import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css"
import 'primeicons/primeicons.css';
import './App.css'
import Header from "./Header";
import Game from "./Game"

export default function App() {
  return (
    <PrimeReactProvider>
      <Header />
      <Game />
    </PrimeReactProvider>
  )
}