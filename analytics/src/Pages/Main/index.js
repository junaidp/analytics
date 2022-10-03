import React, { useEffect } from "react";
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
// import AdvanceFilter from "../../components/Filter";
// import CustomList from "../../components/List";
import BasicAlerts from "../../components/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Service from "../Services";
const Input = styled("input")({
  display: "none",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Main = () => {
  // const [columns, setColumns] = useState([]);
  const [newCoumns, setNewColumns] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [missingJCCodeSequence, setMissingJCCodeSequence] = useState([]);
  const [undefinedJCRecords, setUndefinedJCRecords] = useState([]);
  const [duplicatesJcRecords, setDuplicatesJcRecords] = useState([]);
  const [isGridShow, setIsGridShow] = useState(true);
  const { get, uploadFile } = Service;
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "",
    text: "",
  });

  useEffect(() => {
    console.log("useeffect");
    fetchData();
  },[]);

  const fetchData = (data) => {
    setIsVisible(true);
    console.log("data", data);
    get(data).then((res) => {
      console.log("response", res);
      setGridData(res);
      setIsVisible(false);
    });
  }

  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'jcCode', headerName: 'JcCode', width: 90 },
    { field: 'date', headerName: 'Date', width: 90 },
    {
      field: 'clDate',
      headerName: 'ClDate',
      width: 90,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
    },
    {
      field: 'cusDescription',
      headerName: 'CusDescription',
      width: 90,
    },
    {
      field: 'service',
      headerName: 'Service',
      width: 90,
    },
    {
      field: 'amt',
      headerName: 'AMT',
      width: 90,
    },
    {
      field: 'warAMT',
      headerName: 'WarAMT',
      width: 90,
    },
    {
      field: 'taxAMT',
      headerName: 'TaxAMT',
      width: 90,
    },
    {
      field: 'totAMT',
      headerName: 'TotAMT',
      width: 90,
    },
    {
      field: 'day',
      headerName: 'Day',
      width: 90,
    },
    {
      field: 'month1',
      headerName: 'Month1',
      width: 90,
    },
    {
      field: 'month',
      headerName: 'Month',
      width: 90,
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 90,
    },
    {
      field: 'dt',
      headerName: 'Dt',
      width: 90,
    },
  ];

  const issues = [
    { field: 1, headerName: "Empty JC Codes", data: undefinedJCRecords },
    { field: 2, headerName: "Duplicate JC Codes", data: duplicatesJcRecords },
    {
      field: 3,
      headerName: "Missing Sequence in JC Code",
      data: missingJCCodeSequence,
    },
  ];

  const onChange = async (e) => {
    const [file] = e.target.files;
    console.log("file", file);
    fileUpload(file);
    // const reader = new FileReader();

    // await Promise.all(
    //   (reader.onload = (evt) => {
    //     const bstr = evt.target.result;
    //     const wb = XLSX.read(bstr, { type: "binary" });
    //     const wsname = wb.SheetNames[0];
    //     const ws = wb.Sheets[wsname];
    //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    //     console.log(data);
    //     mapData(data);
    //   }),
    //   reader.readAsBinaryString(file)
    // );
  };

  const fileUpload = (data) => {
    setIsVisible(true);
    uploadFile(data).then((res) => {
      setGridData(res);
      setIsVisible(false);
    });
  }

  // const mapData = (data = []) => {
  //   let columns = [];
  //   let gridData = [];
  //   data.map((el, index) => {
  //     if (index == 0) {
  //       el.map((element) => {
  //         let column = {
  //           field: replaceSpaceWithCharacter(element),
  //           headerName: toTitleCase(element),
  //           width: 90,
  //         };
  //         columns.push(column);
  //       });
  //       setColumns(columns);
  //     } else {
  //       //console.log("columns", columns);
  //       let record = {};
  //       columns.forEach((obj, index2) => {
  //         record["id"] = index;
  //         record[obj.field] = el[index2];
  //       });
  //       gridData.push(record);
  //     }
  //   });
  //   setGridData(gridData);
  //   setIsVisible(false);
  // };

  const onCancel = () => {
    setIsDataFiltered(false);
    setIsGridShow(true);
    setIsVisible(false);
    setAlert({ isAlert: false });
  };

  // const filterHandleSubmit = (e) => {
  //   setAlert({ isAlert: false });
  //   setIsVisible(true);
  //   switch (e.query) {
  //     case 1: {
  //       getMissingRecords(gridData, e.column);
  //       break;
  //     }
  //     case 2: {
  //       getDuplicateRecords(gridData, e.column);
  //       break;
  //     }
  //     case 3: {
  //       findMissingSequence(gridData, e.column);
  //       break;
  //     }
  //     default: {
  //     }
  //   }
  // };

  // const getMissingRecords = async (data = [], field) => {
  //   let missingData = [];
  //   data.map((el) => {
  //     if (el[field] == null || el[field] == undefined || el[field] == "") {
  //       missingData.push(el);
  //       console.log("el", el);
  //     }
  //   });

  //   setIsDataFiltered(true);
  //   setIsGridShow(true);
  //   setFilteredData(missingData);
  //   setIsVisible(false);
  //   console.log("MissingData", missingData);
  // };

  const getDuplicateRecords = async (data = [], field) => {
    const duplicateIds = data
      .map((v) => v[field])
      .filter((v, i, vIds) => vIds.indexOf(v) !== i);

    const duplicates = data.filter((obj) => duplicateIds.includes(obj[field]));
    setDuplicatesJcRecords(duplicates);
  };

  // const findMissingSequence = async (data = [], field) => {
  //   if (field != "Jc_Code") {
  //     setAlert({
  //       isAlert: true,
  //       severity: "error",
  //       text: "This filter is only applicable for JC Code",
  //     });
  //     return;
  //   }
  //   let missingRecords = [];

  //   await Promise.all(
  //     data
  //       .filter((i) => i)
  //       .map((el, index) => {
  //         let difference;

  //         difference = (data[index + 1]?.Jc_Code || 0) - el.Jc_Code;
  //         if (difference > 1) {
  //           let r1 = el.Jc_Code + 1;
  //           let r2 = el.Jc_Code + difference - 1;
  //           let text =
  //             r1 == r2
  //               ? `${el.Jc_Code + 1} is missing`
  //               : `${el.Jc_Code + 1} - ${
  //                   el.Jc_Code + difference - 1
  //                 } is missing`;

  //           missingRecords.push({ id: index, field: text });
  //         }
  //       })
  //   );
  //   console.log("missingRecords", missingRecords);
  //   setNewColumns([
  //     {
  //       field: "id",
  //       headerName: "S No.",
  //       width: 100,
  //     },
  //     {
  //       field: "field",
  //       headerName: "Range",
  //       width: 300,
  //     },
  //   ]);
  //   setIsDataFiltered(true);
  //   setIsGridShow(false);
  //   setFilteredData(missingRecords);
  //   setIsVisible(false);
  //   // setMissingRecord(missingRecords);
  // };

  const handleAnalyzeData = () => {
    let missingData = [];
    let missingSequence = [];
    //let duplicates = [];
    gridData.map((el, index) => {
      if (el.Jc_Code == null || el.Jc_Code == undefined || el.Jc_Code == "") {
        missingData.push(el);
      }

      let difference;
      difference = (gridData[index + 1]?.Jc_Code || 0) - el.Jc_Code;
      if (difference > 1) {
        let r1 = el.Jc_Code + 1;
        let r2 = el.Jc_Code + difference - 1;
        let text =
          r1 == r2
            ? `${el.Jc_Code + 1} is missing`
            : `${el.Jc_Code + 1} - ${el.Jc_Code + difference - 1} is missing`;

        missingSequence.push({ id: index, field: text });
      }

      // let duplicateValue = gridData.filter((i) => i.Jc_Code === el.Jc_Code);
      // debugger;
      // if (duplicateValue.length > 1) {
      //   if (!duplicates.some((i) => i.Jc_Code == el.Jc_Code))
      //     duplicates.push(...duplicateValue);
      // }
    });

    getDuplicateRecords(gridData, 'Jc_Code');
    setMissingJCCodeSequence(missingSequence);
    setUndefinedJCRecords(missingData);
  };

  // const handleFilterData = (event) => {
  //   if (event.field == 3) {
  //     setNewColumns([
  //       {
  //         field: "id",
  //         headerName: "S No.",
  //         width: 100,
  //       },
  //       {
  //         field: "field",
  //         headerName: "Range",
  //         width: 300,
  //       },
  //     ]);
  //     setIsGridShow(false);
  //   } else {
  //     setIsGridShow(true);
  //   }
  //   setIsDataFiltered(true);
  //   setFilteredData(event.data);
  // };

  console.log("missingSequence", missingJCCodeSequence);
  console.log("undefinedJCRecords", undefinedJCRecords);

  return (
    <>
      <Grid>
        {isVisible ? <LinearLoader isVisible={isVisible} /> : null}
        <label htmlFor="contained-button-file">
          <Input
            id="contained-button-file"
            multiple
            type="file"
            onChange={onChange}
          />
          <Grid container spacing={2} className="issue-bar">
            <Grid item xs={11}></Grid>
            <Grid item xs={1}
              style={{
                paddingRight: '50px',
                paddingLeft: '10px'
              }}>
              <Button variant="contained" component="span">
                Upload
              </Button>
            </Grid>
          </Grid>
        </label>
        <Grid container spacing={2} className="issue-bar">
          <Grid item xs={3}>
            <Button variant="outlined" onClick={handleAnalyzeData}>
              Analyze
            </Button>
            <Card style={{ marginTop: "15px", marginLeft: "25px" }}>
              <label>Issues</label>
              <Divider />
              <CardContent>
                {issues
                  .filter((i) => i.data.length > 0)
                  .map((el, index) => (
                    <div
                      onClick={(e) => setGridData(el)}
                      style={{ cursor: "pointer" }}
                      key={index}
                    >
                      {el.headerName}
                    </div>
                  ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
            {alert.isAlert ? (
              <BasicAlerts
                severity={alert.severity}
                text={alert.text}
              ></BasicAlerts>
            ) : null}
            <DataTableGrid
              gridData={gridData}
              columns={columns}
              isCheckbox={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Main;
