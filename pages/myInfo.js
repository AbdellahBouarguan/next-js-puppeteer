import axios from "axios";
import { useState } from "react";
function myInfo(props) {
  const [scrData, setScrData] = useState({});

  return (
    <div>
      <h1>Info Page</h1>
      <button
        onClick={() => {
          axios
            .post("/api", { usr: props.usr, pass: props.pass })
            .then((res) => setScrData(res.data));
          console.log(scrData);
        }}
      >
        update info
      </button>
      <h3>{scrData.text}</h3>
      <div>{scrData.info}</div>
    </div>
  );
}

export default myInfo;

export function getServerSideProps({ req, res }) {
  return {
    props: { usr: req.cookies.usr || "", pass: req.cookies.pass || "" },
  };
}
