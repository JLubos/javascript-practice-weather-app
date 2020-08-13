window.addEventListener('load', () =>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelelctor('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            position = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksy.net/forecast/fd9d9c6418c23d9474b836767721ad1/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    const {temperature,summary, icon}= data.currently;
                    //set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formula for celsius
                    let celsius = (temperature - 32) * (5/9);
                    //Set Icon
                    setIcons(icon,document.querySelector('.icon'));
                    //Change temp to Celsius/Fahr
                    temperatureSection.addDeventListener('click', () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree = Math.floor(celsius); 
                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })

            });
        });

        

    }


    function setIcons(icons, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, SKycons[currentIcon]);
    }
});