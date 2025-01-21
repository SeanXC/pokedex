import logo from '../assets/logo.svg';
import './Home.css';
import Login from '../components/Login'
import CreateAccount from '../components/CreateAccount';

const Home: React.FC = () => {

    return(
        <div>
            <img src={logo} alt="PokeQuiz Logo" className="logo" />
            <div className='text'>
                <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
                </p>
            </div>
            <div className='account-container'>
                <Login />
                <CreateAccount />
            </div>
        </div>
    ); 
}


export default Home;