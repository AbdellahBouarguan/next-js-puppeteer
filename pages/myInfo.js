import axios from "axios";
import { useState } from "react";
function myInfo(props) {
  const [scrData, setScrData] = useState({});
  const [tableHead, setTableHead] = useState([]);
  const [tableBody, setTableBody] = useState(
    [[]]
    //Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => null))
  );

  return (
    <div>
      <h1>Info Page</h1>
      <button
        onClick={() => {
          axios
            .post("/api", { usr: props.usr, pass: props.pass })
            .then((res) => {
              setScrData(res.data);
              setTableHead(res.data.tHead);
              setTableBody(res.data.tBody);
            });
          console.log(scrData);
        }}
      >
        get info
      </button>
      <h3>{scrData.text}</h3>
      <div className="arRead">
        <table>
          <thead>
            <tr>
              {tableHead.map((i, key) => (
                <th key={key}>{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableBody.map((i, key) => (
              <tr key={key}>
                {i.map((j, key) => (
                  <td key={key}>{j}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default myInfo;

export function getServerSideProps({ req, res }) {
  return {
    props: { usr: req.cookies.usr || "", pass: req.cookies.pass || "" },
  };
}
