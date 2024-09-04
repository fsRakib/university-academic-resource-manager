// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "@/model/user-model";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/dbConnect";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },

//       async authorize(credentials) {
//         if (credentials === null) return null;

//         try {
//           await dbConnect();
//           const user = await User.findOne({
//             email: credentials?.email,
//           })
//           console.log("logged in user: ",user);
//           if (user) {
//             const isMatch = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );

//             if (isMatch) {
//               return user;
//             } else {
//               throw new Error("Email or Password is not correct");
//             }
//           } else {
//             throw new Error("User not found");
//           }
//         } catch (error) {
//           throw new Error(error);
//         }
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],
// });

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          await dbConnect();
          const user = await User.findOne({
            email: credentials?.email,
          });
          console.log("logged in user: ", user);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
