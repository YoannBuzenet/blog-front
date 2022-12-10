import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Adding all props becase we allow react-image-manager to pass some custom properties on session.user object (see Appwrapper) */
      [key: string]: any;
    };
  }
}
