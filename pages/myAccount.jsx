import style from "../styles/pages/MyAccount.module.css";
import NavBar from "../components/Navbar/NavBar";

const MyAccount = () => {
  return (
    <div className={style.container}>
      <NavBar />
      My Account
    </div>
  );
};

export default MyAccount;
