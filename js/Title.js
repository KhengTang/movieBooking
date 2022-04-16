const titleTheater = document.getElementById('theater');
const titleMovie = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied');

export default class Title {
    constructor(root) {
        console.log(root);

        console.log(titleTheater);
        console.log(titleMovie);
        
        let result =  async () => {
            let res = await fetch(
                'http://localhost:5000/bookings', {
                    method: "get"
            })
            res = await res.json();
            console.log(res);

            if(res !== null && res.length > 0) {
                seats.forEach((seat, index) => {
                    if(res.indexOf(index) > -1) {
                        seat.classList.add('occupied');
                    }
                })
            }
        }

        result()
    }
};