import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
//import cheerio from "cheerio";
function Home(props) {
  const [isLoged, setIsLoged] = useState(props.usr.length == 20 ? true : false);
  useEffect(() => {
    console.log(props.usr.length);
  }, [isLoged]);
  return (
    <div className="container">
      <h1>Test Api</h1>
      <div>
        {isLoged ? (
          <button
            onClick={async () => {
              await axios
                .post("/api/logout", {})
                .then((res) => console.log(res));
              setIsLoged(false);
            }}
          >
            <Link href="/">Logout</Link>
          </button>
        ) : (
          <button
            onClick={() => setIsLoged(props.usr.length == 20 ? true : false)}
          >
            <Link href="/login">Login</Link>
          </button>
        )}
        <hr />
        {isLoged ? (
          <Link href="/myInfo">My Info</Link>
        ) : (
          <h3>You are not loged in</h3>
        )}
      </div>
    </div>
  );
}

export default Home;
export function getServerSideProps({ req, res }) {
  return {
    props: { usr: req.cookies.usr || "", pass: req.cookies.pass || "" },
  };
}
