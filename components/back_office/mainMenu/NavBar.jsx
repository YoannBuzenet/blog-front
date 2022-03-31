import navBarStyle from "../../../styles/back_office/menu/Navbar.module.css";
import { signOut, useSession } from "next-auth/react";

import BasicButton from "../../generic/Buttons/Button";

const BackOfficeNavBar = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <nav className={navBarStyle.navbarBack}>
        <div>menu haut navbar</div>
        <div> Bonjour, {session?.user?.firstName}</div>
        <div className={navBarStyle.navbarLogOut}>
          <BasicButton
            handleClick={() => signOut()}
            iconToDisplay="logout"
            text="Déconnexion"
            isLetterCapitalize
            color="secondary"
          />
        </div>
      </nav>
    </div>
  );
};

export default BackOfficeNavBar;
