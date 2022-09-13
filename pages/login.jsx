import { useSession, signIn } from "next-auth/react";

const LoginPage = () => {
  const handleGoogleClick = (e) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `/`,
    });
  };

  return (
    <>
      Login bro
      <button onClick={handleGoogleClick}>Login test</button>
    </>
  );
};

export default LoginPage;
