export const cookieOptions = {
  httpOnly: true,
  // secure: process.env.NODE_ENV === "production",
  secure: false,
  // sameSite: "strict",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
