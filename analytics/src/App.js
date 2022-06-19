import logo from "./logo.svg";
import * as XLSX from "xlsx";
import "./App.css";
import Layout from "./components/Layout";
import DataTableGrid from "./components/Grid";


function App() {
  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log(data);
    };
    reader.readAsBinaryString(file);
  };
  return (
    <div className="App">
      <div >
        <input type="file" onChange={onChange} value="file" />
      </div>
      <Layout>
        <DataTableGrid />
      </Layout>
    </div>
  );
}

export default App;
