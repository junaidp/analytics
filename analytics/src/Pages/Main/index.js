import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import LinearLoader from "../../components/Spinner";
import DataTableGrid from "../../components/Grid";
import BasicAlerts from "../../components/Alert";
import Grid from "@mui/material/Grid";
import Service from "../Services";
import CustomAcordion from "../../components/CustomAcordion";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import FileUploaderRestrictions from "../../components/SingleFileUploader/FileUploaderRestrictions"
import { cols, columns1, issues } from "./columns";


const fileTypes = [".xlsx", ".csv"];
const Main = () => {
  //  const [columns, setColumns] = useState([]);
  const [filterId, setFilterId] = useState(1);
  const [gridData, setGridData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { get, uploadFile, filterData, filterMissingSequence, deleteAllData } = Service;
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "",
    text: "",
  });
  const [files, setFiles] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    console.log("useeffect");
    fetchData();
  }, []);

  const fetchData = (data) => {
    setFilterId(1)
    setIsVisible(true);
    console.log("data", data);
    get(data).then((res) => {
      setIsVisible(false);
      console.log("response", res);
      setGridData(res.analyticsData);
      colMapping(res.columns)
    });
  };

  const colMapping = (array) => {
    var result = [];
    if (array)
      array.map((e, index) => {
        var newObj = {
          field: cols[index].field,
          headerName: e.name,
          width: 90
        }
        result.push(newObj)
      })
    setColumns(result)
  }

  const handleFileChange = async (e) => {
    const [file] = e
    console.log("file", file);
    fileUpload(file);
  };

  const fileUpload = (data) => {
    setIsVisible(true);
    uploadFile(data).then((res) => {
      setGridData(res.value.analyticsData);
      colMapping(res.value.columns)
      setIsVisible(false);
    });
  };

  const deleteData = () => {
    deleteAllData().then((res) => {
      setColumns([]);
      setGridData(res);
    });
  }

  const resetFilter = (data) => {
    fetchData();
  }

  const handleIssues = async (e) => {
    setFilterId(e.id);
    if (e.id == 3)
      return handleFilterMissingSequence()
    filterIssues(e);
  };

  const filterIssues = (data) => {
    setIsVisible(true);
    filterData(data).then((res) => {
      setGridData(res);
      setIsVisible(false);
    })
  }

  const handleFilterMissingSequence = () => {
    filterMissingSequence().then((res) => {
      setGridData(res);
    });
  }

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  console.log("columns", columns);

  return (
    <>
      <Card style={{ padding: "10px" }}>
        <Grid container spacing={2} className="issue-bar">
          <Grid xs={12} container item sx={{ padding: 4 }}>
            <Grid item xs={10} sx={{ paddingLeft: "20px" }}>
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
            <Grid item xs={2} sx={{ paddingLeft: "15px" }}>
              <Button  variant="contained" sx={{ width: "100%", marginBottom: "5px" }} onClick={() => deleteData()} >
                Delete All Data
              </Button>
              <Button variant="contained" sx={{ width: "100%", marginBottom: "5px" }} onClick={() => resetFilter()}>
                Reset Filters
              </Button>
            </Grid>
          </Grid>
          <Grid xs={12} container spacing={2} item>
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
