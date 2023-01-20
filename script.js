const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const allSeats = document.querySelectorAll('.seat:not(.reserved)');

getFromlocalStroge();
calculateTotal();
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal()
    }
})

select.addEventListener('change', function (e) {
    calculateTotal()
})

function calculateTotal() {
    const selectedSeat = container.querySelectorAll('.seat.selected');
    const selectedSeatArr = [];
    const allSeatsArr = [];

    //seçilen koltukları diziye attık
    selectedSeat.forEach(function (seat) {
        selectedSeatArr.push(seat);
    })

    //tüm koltukları diziye attık
    allSeats.forEach(function (seat) {
        allSeatsArr.push(seat);
    })
    //seçilen koltuk dizidini tüm koltukları dizisinde arayıp eşleşen elemanları döndürdük
    let selectedSeatIndex = selectedSeatArr.map(function (seat) {
        return allSeatsArr.indexOf(seat);
    })
    let selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndex);
}

function getFromlocalStroge() {
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0){
        allSeats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(index) {
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}
