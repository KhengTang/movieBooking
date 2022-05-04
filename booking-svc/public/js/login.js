const userId = document.getElementById('userId');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const count = document.getElementById('count');
const confirmBtn = document.querySelector('.booking__btn--confirm');
const cancelBtn = document.querySelector('.booking__btn--cancel');
const testBtn = document.querySelector('.test__btn--test');
const titleTheater = document.getElementById('theater');
const titleMovie = document.getElementById('movie');
var selectedSeatsCount = 0;
var seatsIndex;


userId.addEventListener('change', (event) => {
    console.log(userId.value);

  });

password.addEventListener('change', (event) => {
    console.log(password.value);

  });

submitBtn.addEventListener('click', async (e) => {
    console.log("submitBtn clicked");
    const loginObj = {userId: userId.value, password: password.value};

    let result = await fetch(
        'http://accountservice-env.eba-gk4ubusg.ap-southeast-1.elasticbeanstalk.com/login/'+userId.value+'/', {
            method: "post",
            body: JSON.stringify(loginObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(result.ok){
            console.log("can login");
            window.location.href = "/booking.html";
        }
        else{
            document.getElementById("error").innerHTML = "Invalid username/password."
        };

});



