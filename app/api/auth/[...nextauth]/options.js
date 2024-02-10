import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();

          console.log("data", data);

          if (res.ok && data.user) {
            // data.user.role = "admin";
            const user = data.user;
            user.token = data.tokens.access.token;
            return user;
          }

          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (user && account?.provider === "credentials") {
        return {
          ...token,
          name: `${user.name}`,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },

  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt",
  },
};
