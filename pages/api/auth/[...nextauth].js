import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//TODO : reprendre celui d'easyflow

const callbacks = {};

callbacks.signIn = async function signIn({
  user,
  account,
  profile,
  email,
  credentials,
}) {
  console.log("user", user);
  console.log("account", account);
  console.log("profile", profile);
  if (account.provider === "google") {
    const googleUser = {
      email: user.email,
      googleId: account.providerAccountId,
      login: user.email,
      fullName: user.name,
      firstName: profile.given_name,
      lastName: profile.family_name,
      avatar: user.image,
      userLocale: profile.locale,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      expiresIn: account.expires_at,
    };

    const finalUserObject = {
      user: googleUser,
      provider: "google",
    };

    const userDataFromAPI = await axios
      .post(
        `${process.env.CENTRAL_API_URL}/api/users/login-and-register-if-needed`,
        finalUserObject
      )
      .catch((err) => console.log("error while pinging API : ", err));

    // console.log("data from API", userData.data);

    // fetch data from back end and add it here in user object
    user = { user, ...userDataFromAPI.data };
    return true;
  }

  return false;
};

callbacks.redirect = async function redirect({ url, baseUrl }) {
  // console.log("redirection has been called");
  // console.log("redirection url", url);
  // console.log("redirection baseUrl", baseUrl);
  // console.log("url.startsWith(baseUrl)", url.startsWith(baseUrl));
  if (url.startsWith(baseUrl)) return url;
  // Allows relative callback URLs
  else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
  return baseUrl;
};

callbacks.jwt = async function jwt({
  token,
  user,
  account,
  profile,
  isNewUser,
}) {
  console.log("jwt did trigger");
  console.log("jwt token", token);
  console.log("jwt user", user);
  console.log("jwt account", account);
  console.log("jwt profile", profile);
  console.log("jwt isNewUser", isNewUser);
  if (user) {
    token = { idUser: user.id };
  }

  return token;
};

callbacks.session = async function session({ session, user, token }) {
  // we can fetch info from back end here to add it to the session
  console.log("session in session callback", session);
  console.log("token in session callback", token);
  // token in session callback { iat: 1620653204, exp: 1623245204, idUser }

  // refresh user Data
  if (token.hasOwnProperty("idUser")) {
    let apiResp = await axios.get(
      `${process.env.CENTRAL_API_URL}/api/users/googleId/${token.idUser}`
    );

    session.user = apiResp.data;
  }

  session.idUser = token.idUser;

  return session;
};

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks,
});
