const fullNameINput = document.getElementById('fname1')
const emailInput = document.getElementById('email')
const telephoneInput = document.getElementById('tel')
const genderValue = document.getElementById('gender')
const passwordValue = document.getElementById('password')
const submitButton = document.getElementById('submitButton')
const notif = document.getElementById('notification')
const errorMessage = document.getElementById('errorProvidedMessage')

const url = "https://afriwell-platform-backend.onrender.com/api/user/register"

submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    async function fetchingData(){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const Names = fullNameINput.value
        const email = emailInput.value
        const telephone = telephoneInput.value
        const gender = genderValue.value
        const password = passwordValue.value
        const wholeData = {
            Names: Names,
            email: email,
            phoneNumber:telephone,
            Gender: gender,
            password: password
        }
        const defineHeaders = {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(wholeData)
        }
        try{
            const response = await fetch(url, defineHeaders)
            const data = await response.json();
            if(data.Names){
                setTimeout(function() {
                    document.getElementById("loader").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("loader").style.display = "none"
                        fullNameINput.value = ""
                        telephoneInput.value = ""
                        emailInput.value= ""
                        genderValue.value=""
                        passwordValue.value = ""
                        notif.classList.add("show");
                        setTimeout(function() {
                            notif.classList.remove("show");
                            window.location.href='../loginPage/login.html'
                        }, 3000);
                        
                    }, 3000);
                    
                }, 100);
                
            } else {

                setTimeout(function() {
                    document.getElementById("loader").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("loader").style.display = "none"
                        errorMessage.textContent = data.message
                        errorMessage.style.color = 'red',
                        errorMessage.style.textAlign = 'center'
                        
                    }, 3000);
                    
                }, 100);

                
            }
            
        } catch(err){
            console.log(err)
        }
    }
    fetchingData()
    
});