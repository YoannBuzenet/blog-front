import navBarStyle from "../../../styles/back_office/menu/Navbar.module.css";
import { signOut, useSession } from "next-auth/react";

import BasicButton from "../../generic/Buttons/GenericButton/GenericButton";

const BackOfficeNavBar = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <nav className={navBarStyle.navbarBack}>
        <div>
          <p>menu haut navbar</p>
        </div>
        <div>
          {" "}
          <p>Bonjour, {session?.user?.firstName}</p>
        </div>
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
