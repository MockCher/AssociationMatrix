import { useState } from "react";
import "./styles.css";

const FloatingButton = () => {
  return (
    <div className="float-btn">
      <p>Save</p>
    </div>
  );
};

const ResponsibillitieOverview = ({ name, objects }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <p style={{}}>{name}</p>
      <div
        style={{ borderLeft: "3px solid grey", padding: "5px", margin: "10px" }}
      >
        {objects.map((o) => (
          <p>{o.au}</p>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [aus, setAus] = useState([
    "Alphstraße 1",
    "Betaweg 2",
    "Deltaplatz 3",
    "An der Gammagedächtniskirche 4",
    "Apfelkotterweg 435",
    "Bananausen 56",
    "Clementinegasse 7c",
    "Dattelig 1c",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "H"
  ]);
  const [fms, setFms] = useState([
    "Hans Hauser",
    "Peter Putzgut",
    "Sven Schlüsseler",
    "Karla Kellerfeger"
  ]);
  const [config, setConfig] = useState([]);
  const [fmGroup, setFmGroup] = useState([]);

  const updatConfig = (data) => {
    let temp = config;
    let au = data.target.name;
    let fm = data.target.value;
    temp = temp.filter((c) => c.au !== au);

    temp.push({ fm, au });
    setConfig(temp);

    let temp2 = groupBy(temp, "fm");
    setFmGroup(temp2);
    console.log(`${fm} ist für ${au} verantwortlich.`);
  };

  const groupBy = (arr, key) =>
    arr.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item]
      }),
      {}
    );

  return (
    <div className="App">
      <table width="100%">
        <thead>
          <tr>
            <th>+</th>
            {fms.map((fm) => (
              <th>{fm}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {aus.map((au) => (
            <tr key={au}>
              <td>{au}</td>
              {fms.map((fm) => (
                <td key={fm + au}>
                  {/* <label htmlFor={au+fm}>
                  </label> */}
                  <input
                    id={au + fm}
                    onChangeCapture={updatConfig}
                    name={au}
                    type="radio"
                    value={fm}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Übersicht</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {Object.entries(fmGroup).map((f) => (
          <ResponsibillitieOverview name={f[0]} objects={f[1]} />
        ))}
      </div>
      <FloatingButton />
    </div>
  );
}
