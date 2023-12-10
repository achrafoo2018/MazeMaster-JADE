import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import logo from './assets/logo.jpg'

export default function Header() {
    const items = [
        {
            label: 'Super Maze',
        },
      
    ];

    const start = <img alt="logo" src={logo} height="60" className="mr-2"></img>;
    // const end = <InputText placeholder="Search" type="text" className="w-full" />;

    return (
        <div className="card">
            <Menubar model={items} start={start}  />
        </div>
    )
}
        