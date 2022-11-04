export const cols = [
    { field: "id", headerName: "Id", width: 90, typeId: "jcCode" },
    { field: "jcCode", headerName: "JcCode", width: 90, typeId: "jcCode" },
    { field: "date", headerName: "Date", width: 90, typeId: "date" },
    {
        field: "clDate",
        headerName: "ClDate",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "type",
        headerName: "Type",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "cusDescription",
        headerName: "CusDescription",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "service",
        headerName: "Service",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "amt",
        headerName: "AMT",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "warAMT",
        headerName: "WarAMT",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "taxAMT",
        headerName: "TaxAMT",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "totAMT",
        headerName: "TotAMT",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "day",
        headerName: "Day",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "month1",
        headerName: "Month1",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "month",
        headerName: "Month",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "year",
        headerName: "Year",
        width: 90,
        typeId: "jcCode",
    },
    {
        field: "dt",
        headerName: "Dt",
        width: 90,
        typeId: "jcCode",
    },
];

export const columns1 = [
    { field: "id", headerName: "S No", width: 90 },
    { field: "name", headerName: "Name", width: '100%' }
];

export const issues = [
    { id: 1, name: "Empty JC Codes", typeId: "jcCode" },
    { id: 2, name: "Duplicate JC Codes", typeId: "jcCode" },
    {
        id: 3,
        name: "Missing Sequence in JC Code",
        typeId: "jcCode",
    },
    { id: 4, name: "Empty JC Codes", typeId: "date" },
    { id: 5, name: "Duplicate JC Codes", typeId: "clDate" },
    {
        id: 6,
        name: "Missing Sequence in JC Code",
        typeId: "clDate",
    },
];