import { Request, Response } from "express";



export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const myUsername = process.env.USER_NAME || "admin" ;
  const myPassword = process.env.PASSWORD || "password";


  console.log(username, myUsername)
  console.log(password, myPassword)

  // Verifikasi username dan password
  if (username === myUsername && password === myPassword) {
    // Set session cookie untuk menandakan login
    res.cookie("isAuthenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.json({ 
      status: "success",
      message: "Login berhasil" 
    });
  } else {
    return res.status(401).json({ message: "username atau password salah" });
  }
};

export const logout = (req: Request, res: Response) => {
  // Hapus cookie untuk logout
  res.clearCookie("isAuthenticated");
  return res.json({ 
    status: "success",
    message: "Logout berhasil" 
  });
};
