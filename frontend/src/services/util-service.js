
export const utilService = {
    uploadImg
}


function uploadImg(ev) {
    const CLOUD_NAME = "dwuasrttm"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    
    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'cucssrug'); // second parameter is the upload preset
    console.log('UTIL IMGL: ', ev.target.files[0]);
    
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log('IMG UPLOAD: ', res)
            return res.url
            // return res
        })
        .catch(err => console.error(error))
}
