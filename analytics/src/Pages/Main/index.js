import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import LinearLoader from "../../components/Spinner";
import DataTableGrid from "../../components/Grid";
import BasicAlerts from "../../components/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Service from "../Services";
import CustomAcordion from "../../components/CustomAcordion";
import {
  replaceSpaceWithCharacter,
  toTitleCase,
} from "../../components/Helper";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FileUploaderRestrictions from "../../components/SingleFileUploader/FileUploaderRestrictions"
import { columns, columns1, issues } from "./columns";

const fileTypes = [".xlsx", ".csv"];

const Main = () => {

  //  const [columns, setColumns] = useState([]);
  const [newCoumns, setNewColumns] = useState([]);
  const [filterId, setFilterId] = useState(1);
  const [gridData, setGridData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [missingJCCodeSequence, setMissingJCCodeSequence] = useState([]);
  const [undefinedJCRecords, setUndefinedJCRecords] = useState([]);
  const [duplicatesJcRecords, setDuplicatesJcRecords] = useState([]);
  const [
    duplicatesPartsWithDifferentPrice,
    setDuplicatesPartsWithDifferentPrice,
  ] = useState([]);
  const [isGridShow, setIsGridShow] = useState(true);
  const { get, uploadFile, filterData, filterMissingSequence, deleteAllData } = Service;
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "",
    text: "",
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("useeffect");
    fetchData();
  }, []);

  const fetchData = (data) => {
    setFilterId(1)
    setIsVisible(true);
    console.log("data", data);
    get(data).then((res) => {
      console.log("response", res);
      setGridData(res);
      setIsVisible(false);
    });
  };





  // const fetchData = (data) => {
  //   setIsVisible(true);
  //   console.log("data", data);
  //   get(data).then((res) => {
  //     console.log("response", res);
  //     setGridData(res);
  //     setIsVisible(false);
  //   });
  // }

  const handleFileChange = async (e) => {
    const [file] = e
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
  };

  const deleteData = () => {
    deleteAllData().then((res) => {
      setGridData(res);
    });
  }

  const resetFilter = (data) => {
    fetchData();
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

  const handleIssues = async (e) => {
    setFilterId(e.id);
    if (e.id == 3)
      return handleFilterMissingSequence()
    filterIssues(e);
  };

  const filterIssues = (data) => {
    setIsVisible(true);
    console.log("data", data);
    filterData(data).then((res) => {
      console.log("response", res);
      setGridData(res);
      setIsVisible(false);
    })
  }

  const handleFilterMissingSequence = () => {
    filterMissingSequence().then((res) => {
      console.log("MissingSequence", res);
      setGridData(res);
    });
  }
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

  const getDuplicatePartsWithDifferentPrice = async (data = [], field) => {
    // const duplicateParts = data
    //   .map((v) => v[field])
    //   .filter((v, i, vIds) => vIds.indexOf(v) !== i);
    // debugger
    // const duplicates = data.filter((obj) => duplicateParts.includes(obj[field]));
    // console.log("duplicateParts",duplicates);
    // setDuplicatesPartsWithDifferentPrice(duplicates);
    debugger;
    let a = data.filter((value, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) =>
            t[field] === value[field] && t["Tot._Amt."] === value["Tot._Amt."]
        )
      );
    });
    //let a = data.filter((v,i,a)=>a.findIndex(v2=>['Part/Service','Tot._Amt.'].every(k=>v2[k] ===v[k]))===i)

    setDuplicatesPartsWithDifferentPrice(a);
  };

  const getDuplicateRecords = gridData.reduce((a, e) => {
    a[e.Jc_Code] = ++a[e.Jc_Code] || 0;
    return a;
  }, {});

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
    let duplicates = [];
    // gridData.map((el, index) => {
    //   if (el.Jc_Code == null || el.Jc_Code == undefined || el.Jc_Code == "") {
    //     missingData.push(el);
    //   }

    //   let difference;
    //   difference = (gridData[index + 1]?.Jc_Code || 0) - el.Jc_Code;
    //   if (difference > 1) {
    //     let r1 = el.Jc_Code + 1;
    //     let r2 = el.Jc_Code + difference - 1;
    //     let text =
    //       r1 == r2
    //         ? `${el.Jc_Code + 1} is missing`
    //         : `${el.Jc_Code + 1} - ${el.Jc_Code + difference - 1} is missing`;

    getDuplicateRecords(gridData, "Jc_Code");
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

  // const handleFileChange = (data) => {
  //   setFiles(data);
  //   uploadDocument(data);
  // };

  // const uploadDocument = (data) => {
  //   post(data).then((res) => {
  //     console.log("fileupload Response", res);
  //   });
  // };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  return (
    <>
      <Card style={{ padding: "10px" }}>
        <Grid spacing={2} className="issue-bar">
          <Grid xs={12} container spacing={2} sx={{ padding: 4 }}>
            <Grid item xs={10}>
              <Box sx={{ border: "inset" }}>
                <FileUploaderRestrictions
                  accept={fileTypes}
                  iconType="image"
                  onChange={handleFileChange}
                  files={files}
                  handleRemoveAllFiles={handleRemoveAllFiles}
                  handleRemoveFile={handleRemoveFile}
                  maxFiles={1}
                />
              </Box>
              {isVisible ? <LinearLoader isVisible={isVisible} /> : null}
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" sx={{ width: "100%", marginBottom: "5px" }} onClick={() => deleteData()} >
                Delete All Data
              </Button>
              <Button variant="contained" sx={{ width: "100%", marginBottom: "5px" }} onClick={() => resetFilter()}>
                Reset Filters</Button>
            </Grid>
          </Grid>
          <Grid xs={12} container spacing={2}>
            <Grid item xs={3}>
              <CustomAcordion
                columns={columns}
                issues={issues}
                handleIssues={handleIssues}
              />
            </Grid>
            <Grid item xs={9} >
              {alert.isAlert ? (
                <BasicAlerts
                  severity={alert.severity}
                  text={alert.text}
                ></BasicAlerts>
              ) : null}
              <DataTableGrid
                gridData={gridData}
                columns={filterId == 3 ? columns1 : columns}
                isCheckbox={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
export default Main;
