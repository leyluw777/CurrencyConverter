var leftBoxBtns = document.getElementById("leftBoxBtns");
var btns1 = leftBoxBtns.getElementsByClassName("btn");
var rightBoxBtns = document.getElementById("rightBoxBtns");
var btns2 = rightBoxBtns.getElementsByClassName("btns");
var current2 = rightBoxBtns.getElementsByClassName("active");
var current1 = leftBoxBtns.getElementsByClassName("active");
var leftInput = document.getElementById("leftInput");
var rightInput = document.getElementById('rightInput');
var leftParagraph = document.getElementById('leftP')
var rightParagraph = document.getElementById('rightP')

fetch(`https://api.exchangerate.host/latest?base=RUB&symbols=USD`)
  .then(resp => resp.json())
  .then(data => {
    leftParagraph.innerHTML = (`1 RUB = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} USD`)
    leftInput.value = leftInput.value.replace(/\s/g, '')
    rightInput.value = rightInput.value.replace(/\s/g, '')
    var transform22 = data.rates[Object.keys(data.rates)[0]] * leftInput.value;
    var transform2 = transform22 % 1 !== 0 ? Number(transform22.toFixed(2)) : transform22;
    leftInput.value = leftInput.value.toString().replace(/ /g, "");
    leftInput.value = leftInput.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    transform2 = transform2.toString().replace(/ /g, "");
    transform2 = transform2.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    rightInput.value = transform2
  })


fetch(`https://api.exchangerate.host/latest?base=USD&symbols=RUB`)
  .then(resp => resp.json())
  .then(data => {
    rightParagraph.innerHTML = (`1 USD = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} RUB`)
  })

function checkKey() {
  var clean = this.value.replace(/[^0-9.,]/g, "")
    .replace(/(,.*?),(.*,)?/, "$1");
  if (clean !== this.value) this.value = clean;
}

leftInput.oninput = checkKey;
rightInput.oninput = checkKey;
leftInput.addEventListener('keyup', function (e) {
  e.target.value = e.target.value.replace(/ /g, "");
  e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

rightInput.addEventListener('keyup', function (e) {
  e.target.value = e.target.value.replace(/ /g, "");
  e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

for (var i = 0; i < btns1.length; i++) {
  btns1[i].addEventListener("click", function () {
    current1[0].className = current1[0].className.replace(" active", "");
    this.className += " active";

    if (current1[0]) {
      var base = current1[0].value;
      var rate = current2[0].value;
      const api_url = fetch(`https://api.exchangerate.host/latest?base=${rate}&symbols=${base}`)
        .then(response => response.json())
        .then(data => {
          console.log(rate)
          rightInput.value = rightInput.value.replace(/\s/g, '')
          leftInput.value = leftInput.value.replace(/\s/g, '')
          var transform = data.rates[Object.keys(data.rates)[0]] * rightInput.value;
          var transform1 = transform % 1 !== 0 ? Number(transform.toFixed(2)) : transform;
          transform1 = transform1.toString().replace(/ /g, "");
          transform1 = transform1.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          rightInput.value = rightInput.value.toString().replace(/ /g, "");
          rightInput.value = rightInput.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          rightInput.value = rightInput.value.replace(/,/g, '.')
          leftInput.value = transform1.toString()
          rightParagraph.innerHTML = (`1 ${rate} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${base}`)
          console.log(transform)
        });
      fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${rate}`)
        .then(resp => resp.json())
        .then(data => {
          leftParagraph.innerHTML = (`1 ${base} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${rate}`)
        })
      console.log(api_url);
    }
  });

  btns2[i].addEventListener("click", function () {
    current2[0].className = current2[0].className.replace(" active", "");
    this.className += " active";
    if (current2[0]) {
      var base = current1[0].value;
      var rate = current2[0].value;
      const api_url = fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${rate}`)
        .then(response => response.json())
        .then(data => {
          console.log(rate)
          leftInput.value = leftInput.value.replace(/\s/g, '')
          rightInput.value = rightInput.value.replace(/\s/g, '')
          leftInput.value = leftInput.value.replace(/,/g, '.')
          var transform22 = data.rates[Object.keys(data.rates)[0]] * leftInput.value;
          var transform2 = transform22 % 1 !== 0 ? Number(transform22.toFixed(2)) : transform22;
          leftInput.value = leftInput.value.toString().replace(/ /g, "");
          leftInput.value = leftInput.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          transform2 = transform2.toString().replace(/ /g, "");
          transform2 = transform2.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          rightInput.value = transform2
          leftParagraph.innerHTML = (`1 ${base} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${rate}`)
          console.log(transform22)
        })
      fetch(`https://api.exchangerate.host/latest?base=${rate}&symbols=${base}`)
        .then(resp => resp.json())
        .then(data => {
          rightParagraph.innerHTML = (`1 ${rate} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${base}`)
        })
    }
  });
}

