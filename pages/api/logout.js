import cookie from "cookie";

export default async (req, res) => {
  await res.setHeader("Set-Cookie", [
    cookie.serialize("usr", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("pass", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
  ]);
  await res.status(200).json({ success: true });
};
