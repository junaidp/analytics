import AppConsts from "../appconst";

//const URL = 'https://9979-213-196-213-232.ngrok.io/car?hsn=1679&tsn=214&vehicleType=PASSENGER_CAR&manufacture=volvo&fuelType=BENZIN&enginePowerRange=RANGE_0_TO_50KW&carType=LIMOUSINE&tradeName=trade&maxHits=1';
const URL = AppConsts.appBaseUrl
const Service = {
    get: (data) => {
        console.log("URL", URL);
        let url = URL + 'Api/Analytics/Get';
        return fetch(url)
            .then((res) =>
                res.json())
    },
    getById: (data) => {
        console.log("URL", URL);
        let url = URL + 'Api/Analytics/Get/{id}';
        return fetch(url)
            .then((res) =>
                res.json())
    },
    post: (data) => {
        console.log("URL", URL);
        let url = URL + 'Api/Analytics/AddAnalytics';
        return fetch(url)
            .then((res) =>
                res.json())
    },
    put: (data) => {
        console.log("URL", URL);
        let url = URL + 'Api/Analytics/UpdateAnalytics';
        return fetch(url)
            .then((res) =>
                res.json())
    },
    delete: (data) => {
        console.log("URL", URL);
        let url = URL + 'Api/Analytics/Delete/{id}';
        return fetch(url)
            .then((res) =>
                res.json())
    },
    uploadFile: (data) => {
        console.log("URL", URL);
        const form = new FormData();
        form.append("File", data)
        let url = URL + 'Api/Analytics/AddAnalytics/ReadFile';
        return fetch(url, {
            method: 'POST',
            body: form,
        })
            .then((res) =>
                res.json())
    },
    filterData: (data) => {
        console.log("URL", URL);
        const form = new FormData();
        form.append("id", data.id);
        form.append("name", data.name);
        form.append("typeId", data.typeId);
        let url = URL + 'Api/Analytics/FilterData';
        return fetch(url, {
            method: 'POST',
            body: form
        })
            .then((res) =>
                res.json())
    },
    filterMissingSequence: (data) => {
        console.log("URL", URL);
             const form = new FormData();
        // form.append("id", data.id);
        // form.append("name", data.name);
        // form.append("typeId", data.typeId);
        let url = URL + 'Api/Analytics/FilterMissingSequence';
        return fetch(url, {
            method: 'POST',
            body: form
        })
            .then((res) => 
                res.json())
    }
}
export default Service;

