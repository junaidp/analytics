import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import * as XLSX from "xlsx";
import LinearLoader from "../../components/Spinner";
import {
  replaceSpaceWithCharacter,
  toTitleCase,
} from "../../components/Helper";
import DataTableGrid from "../../components/Grid";
import AdvanceFilter from "../../components/Filter";
import CustomList from "../../components/List";
import BasicAlerts from "../../components/Alert";
const Input = styled("input")({
  display: "none",
});

const Main = () => {
  const [columns, setColumns] = useState([]);
  const [newCoumns, setNewColumns] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [missingJCRecord, setMissingRecord] = useState([]);
  const [isGridShow, setIsGridShow] = useState(true);
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "",
    text: "",
  });

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
        gridData.push(record);
      }
    });
    setGridData(gridData);
    setIsVisible(false);
  };

  const onCancel = () => {
    setIsDataFiltered(false);
    setIsGridShow(true);
    setIsVisible(false);
    setAlert({ isAlert: false });
  };

  const filterHandleSubmit = (e) => {
    setAlert({ isAlert: false });
    setIsVisible(true);
    switch (e.query) {
      case 1: {
        getMissingRecords(gridData, e.column);
        break;
      }
      case 2: {
        getDuplicateRecords(gridData, e.column);
        break;
      }
      case 3: {
        findMissingSequence(gridData, e.column);
        break;
      }
      default: {
      }
    }
  };

  const getMissingRecords = async (data = [], field) => {
    let missingData = [];
    data.map((el) => {
      if (el[field] == null || el[field] == undefined || el[field] == "") {
        missingData.push(el);
        console.log("el", el);
      }
    });

    setIsDataFiltered(true);
    setIsGridShow(true);
    setFilteredData(missingData);
    setIsVisible(false);
    console.log("MissingData", missingData);
  };

  const getDuplicateRecords = async (data = [], field) => {
    const duplicateIds = data
      .map((v) => v[field])
      .filter((v, i, vIds) => vIds.indexOf(v) !== i);

    const duplicates = data.filter((obj) => duplicateIds.includes(obj[field]));

    console.log("duplicates", JSON.stringify(duplicates));
    setIsDataFiltered(true);
    setIsGridShow(true);
    setFilteredData(duplicates.sort((a, b) => a[field] - b[field]));
    setIsVisible(false);
  };

  const findMissingSequence = async (data = [], field) => {
    if (field != "Jc_Code") {
      setAlert({
        isAlert: true,
        severity: "error",
        text: "This filter is only applicable for JC Code",
      });
      return;
    }
    let missingRecords = [];

    await Promise.all(
      data
        .filter((i) => i)
        .map((el, index) => {
          let difference;

          difference = (data[index + 1]?.Jc_Code || 0) - el.Jc_Code;
          if (difference > 1) {
            let r1 = el.Jc_Code + 1;
            let r2 = el.Jc_Code + difference - 1;
            let text =
              r1 == r2
                ? `${el.Jc_Code + 1} is missing`
                : `${el.Jc_Code + 1} - ${
                    el.Jc_Code + difference - 1
                  } is missing`;

            missingRecords.push({ id: index, field: text });
          }
        })
    );
    console.log("missingRecords", missingRecords);
    setNewColumns([
      {
        field: "id",
        headerName: "S No.",
        width: 100,
      },
      {
        field: "field",
        headerName: "Range",
        width: 300,
      },
    ]);
    setIsDataFiltered(true);
    setIsGridShow(false);
    setFilteredData(missingRecords);
    setIsVisible(false);
    // setMissingRecord(missingRecords);
  };

  return (
    <>
      {isVisible ? <LinearLoader isVisible={isVisible} /> : null}
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
      <AdvanceFilter
        columns={columns}
        handleSubmit={filterHandleSubmit}
        onCancel={onCancel}
      />
      {alert.isAlert ? (
        <BasicAlerts severity={alert.severity} text={alert.text}></BasicAlerts>
      ) : null}
      <DataTableGrid
        gridData={isDataFiltered ? filteredData : gridData}
        columns={isGridShow ? columns : newCoumns}
        isCheckbox={false}
      />
      {/* <CustomList title="Missing JC Code" data={missingJCRecord} /> */}

      {/* <LinearLoader isVisible={isVisible} /> */}
    </>
  );
};
export default Main;
