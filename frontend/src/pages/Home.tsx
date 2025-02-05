import logo from "../assets/logo.svg";
import "./Home.css";
import UserCard from "../components/UserCard";

interface HomeProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setUsername: (name: string) => void;
}

const Home: React.FC<HomeProps> = ({ setPage, setUsername }) => {
  return (
    <div>
      <div className="center">
        <img src={logo} alt="PokeQuiz Logo" className="logo" />
      </div>
      <div className="text">
        <p>
          PokeQuiz is a web application that lets you search for and collect
          lots of pokemons. By registering, you can search for your favourite
          pokemons and add them to your list of favourites. You can also play
          the famous ‘Who's that pokemon’ game: you have a picture of a pokemon
          and you have to find its name to earn points. Create an account and
          join our community!
        </p>
      </div>
      <div className="account-container">
        <UserCard setPage={setPage} mode="login" setUsername={setUsername} />
        <UserCard setPage={setPage} mode="create" setUsername={setUsername} />
      </div>
    </div>
  );
};

export default Home;
