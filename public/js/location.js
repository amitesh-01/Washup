const FindMyLocation=(e)=>{
    e.preventDefault()

    const status=document.querySelector('.status');
    const success=(position)=>{
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            status.textContent = data.city
            //status.textContent = data.principalSubdivision

        })
    }

    const error=()=>{
        status.textContent='Unable to Get location';
    }
    navigator.geolocation.getCurrentPosition(success,error);
    console.log('a');
}

document.querySelector('.find-state').addEventListener('click',FindMyLocation);