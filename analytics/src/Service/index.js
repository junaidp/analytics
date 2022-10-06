import AppConsts from "../appconst";

const URL = AppConsts.appBaseUrl
const Service = {
    get: (data) => {

        let url = URL;
        console.log("URL", URL);
        return fetch(url)
            .then((res) =>
                res.json())
    },
    post: (data) => {
        debugger
        const formData = new FormData();
        formData.append("file", data[0]);
        let url = URL;
        // console.log("URL", URL);
        // return fetch(url, formData)
        //     .then((res) =>
        //         res.json())

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }
}
export default Service;

