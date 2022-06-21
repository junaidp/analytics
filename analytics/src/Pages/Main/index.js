import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import * as XLSX from "xlsx";
import LinearLoader from "../../components/Spinner";
import { replaceSpaceWithCharacter, toTitleCase } from "../../components/Helper";
import DataTableGrid from '../../components/Grid'
const Input = styled("input")({
  display: "none",
});

const Main = () => {
  const [columns, setColumns] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const onChange = (e) => {
    setIsVisible(true);
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      //debugger;
      console.log(data);
      mapData(data);
    };
    reader.readAsBinaryString(file);
  };

  const mapData = (data = []) => {
    let columns = [];
    let gridData = [];
    data.map((el, index) => {
      if (index == 0) {
        el.map((element) => {
          let column = {
            field: replaceSpaceWithCharacter(element),
            headerName: toTitleCase(element),
            width: 90,
          };
          columns.push(column);
        });
        setColumns(columns);
      } else {
        console.log("columns", columns);
        let record = {};
        columns.forEach((obj, index2) => {
          record["id"] = index;
          record[obj.field] = el[index2];
        });
        debugger;
        gridData.push(record);
      }
    });
    setGridData(gridData);
    setIsVisible(false);
  };
  return (
    <>
      <LinearLoader isVisible={isVisible} />
      <label htmlFor="contained-button-file">
        <Input
          accept="doc/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={onChange}
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>

      <DataTableGrid data={gridData} columns={columns} isCheckbox={false} />
      <LinearLoader isVisible={isVisible} />
    </>
  );
};
export default Main;
