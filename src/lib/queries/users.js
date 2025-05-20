import { User } from "@/model/user-model";

// export async function createUser(user) {
//   try {
//     await User.create(user);
//   } catch (e) {
//     throw new Error(e);
//   }
// }
// export async function createUser(userData) {
//   try {
//     const newUser = await User.create(userData);
//     return newUser; // ✅ return the created user with _id
//   } catch (e) {
//     throw new Error(e.message);
//  // ✅ re-throw the actual error object
//   }
// }