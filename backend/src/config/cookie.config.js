// export const cookieOptions = {
//   httpOnly: true,
//   // secure: process.env.NODE_ENV === "production",
//   secure: false,
//   // sameSite: "strict",
//   sameSite: "lax",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// };

export const cookieOptions = {
  httpOnly: true,
  secure: true, // Must be true for Render (HTTPS)
  sameSite: "none", // Required for cross-domain cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
