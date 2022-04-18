import axios from "axios";
import { useState } from "react";
function myInfo(props) {
  const [scrData, setScrData] = useState({});
  const [isCsv, setIsCsv] = useState(false);
  const [tableHead, setTableHead] = useState([]);
  const [tableBody, setTableBody] = useState(
    [[]]
    //Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => null))
  );

  return (
    <div>
      <h1>Info Page</h1>
      <button
        onClick={async () => {
          await axios
            .post("/api", { usr: props.usr, pass: props.pass })
            .then((res) => {
              setScrData(res.data);
              setTableHead(res.data.tHead);
              setTableBody(res.data.tBody);
              setIsCsv(true);
            });
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
      <button
        style={!isCsv ? { display: "none" } : { display: "block" }}
        onClick={(e) => {
          let csv = [];
          let dLink;
          csv.push(tableHead);
          tableBody.forEach((i) => csv.push(i));
          console.log(csv);
          var scvDt = "";
          csv.forEach((row) => {
            scvDt += row.join(";");
            scvDt += "\n";
          });
          //let csvFile = new Blob(csv, { type: "text/csv" });
          dLink = document.createElement("a");
          dLink.download = "result";
          dLink.href = "data:text/csv;charset=utf-8," + encodeURI(scvDt);
          dLink.text = "download it";

          e.currentTarget.parentElement.appendChild(dLink);
          e.currentTarget.style.display = "none";
        }}
      >
        download scv file
      </button>
    </div>
  );
}

export default myInfo;

export function getServerSideProps({ req, res }) {
  return {
    props: { usr: req.cookies.usr || "", pass: req.cookies.pass || "" },
  };
}
