import axios from 'axios';
async function Format (payload,setBtn,which,setfileData) {
    const data = new FormData();
    data.append(`file`, payload.files[0]);
   
    let form = await axios.post(`${process.env.REACT_APP_URL||"http://localhost:3010"}?name=${which}`, data);
    let formData = form.data;
    setfileData({name:payload.files[0].name,arr:formData.sheetNames,rowL:formData.rowL})
        payload.value = null
        setBtn(true)
    
}

export default Format;