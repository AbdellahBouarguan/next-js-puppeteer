import cookie from "cookie";

export default async (req, res) => {
  await res.setHeader("Set-Cookie", [
    cookie.serialize("usr", req.body.usr, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 3600 * 24,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("pass", req.body.pass, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 3600 * 24,
      sameSite: "strict",
      path: "/",
    }),
  ]);
  await res.status(200).json({ success: true });
};
