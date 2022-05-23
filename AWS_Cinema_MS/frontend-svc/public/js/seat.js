const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const confirmBtn = document.querySelector(".booking__btn--confirm");
const cancelBtn = document.querySelector(".booking__btn--cancel");
const testBtn = document.querySelector(".test__btn--test");
const titleTheater = document.getElementById("theater");
const titleMovie = document.getElementById("movie");
var selectedSeatsCount = 0;
var seatsIndex;

// Update count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const occupiedSeats = document.querySelectorAll(".row .seat.occupied");

  selectedSeatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  seatsIndex = [...occupiedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  seatsIndex = seatsIndex.concat(selectedSeatsIndex);

  console.log(seatsIndex);

  //localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});

confirmBtn.addEventListener("click", async (e) => {
  if (
    confirm(
      "Confirm you want to purchase " + selectedSeatsCount + " ticket(s)."
    )
  ) {
    var theaterName = titleTheater.innerText;
    var movieName = titleMovie.innerText;
    e.preventDefault();
    let result = await fetch("http://host.docker.internal:8080/booking", {
      method: "POST",
      body: JSON.stringify({
        user: {
          name: "Brian ",
          lastName: "Khiatani",
          email: "briankhi3@gmail.com",
          membership: "4534542086103735",
        },
        booking: {
          city: "Jurong East",
          cinema: "Block Cinema Jurong East",
          movie: "Hans Solo",
          format: "IMAX",
          schedule: "2022-05-04 18:17:59",
          cinemaRoom: 7,
          seats: ["45"],
          totalAmount: 5,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      //TODO: add in booking id into alert
      alert(
        "Thank You Booking made successfully! Your booking ID is: " +
          result.orderId +
          "\n Have a Nice Day"
      );
    }
    console.log("Go to payment page.");
  } else {
    console.log("Return to booking page");
  }
  //alert("Confirm you want to purchase " + selectedSeatsCount + " ticket(s).");
});

cancelBtn.addEventListener("click", () => {
  if (confirm("Cancel booking?")) {
    console.log("Exit booking page.");
  } else {
    console.log("Return to booking page");
  }
  //alert("Cancel booking?");
});

testBtn.addEventListener("click", async () => {
  console.log(titleTheater);
  console.log(titleMovie);
  let result = await fetch("host.docker.internal:3003/bookings", {
    method: "get",
  });
  result = await result.json();
  console.log(result);
  if (result) {
    alert("Data get successfully");
  }
});
