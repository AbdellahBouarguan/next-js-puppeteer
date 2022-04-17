import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
//import cookie from "js-cookie";
//import cheerio from "cheerio";
function Login(props) {
  const [data, setData] = useState("");
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const inputUserRef = useRef(null);
  const inputPassRef = useRef(null);

  const clickMe = async () => {
    console.log(userInput + " " + passInput);

    await axios
      .post("/api/login", { usr: userInput, pass: passInput })
      .then((res) => console.log(res));
    inputUserRef.current.value = "";
    inputPassRef.current.value = "";
    router.push("/");
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <input
        ref={inputUserRef}
        onChange={(e) => setUserInput(e.target.value)}
        type="email"
        placeholder="Username"
      />
      <input
        ref={inputPassRef}
        onChange={(e) => setPassInput(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button onClick={clickMe}>Go</button>
      <div>{props.usr}</div>
    </div>
  );
}

export default Login;

export function getServerSideProps({ req, res }) {
  return {
    props: { usr: req.cookies.usr || "", pass: req.cookies.pass || "" },
  };
}
