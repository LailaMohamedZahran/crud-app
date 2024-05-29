let nameSite = document.getElementById("s-Name");
let urlSite = document.getElementById("s-url");
let btnSite = document.getElementById("submit");
let closeAlert = document.getElementById("hideAlert");
let alertError = document.getElementById("alertError");
let overlay = document.getElementById("overlay");
let PNameUrl = document.getElementById("NameUrl");
let searchURL = document.getElementById("search");
let arr = [];
let objectIndex = 0;
let btnUpdate = document.getElementById("btnUpdate");
if (window.localStorage.getItem("urlInfo")) {
  arr = JSON.parse(localStorage.getItem("urlInfo"));
  showData();
}

//create function for focus and blur
let allInputs = document.querySelectorAll("input");
allInputs.forEach(function (onlyInput) {
  onlyInput.addEventListener("focus", function () {
    onlyInput.style.boxShadow = "0 0 0 0.25rem #fec26099";
    onlyInput.style.outline = "none";
    allInputs.forEach(function (onInput) {
      onInput.addEventListener("blur", function () {
        onlyInput.style.boxShadow = "none";
      });
    });
  });
});

function validName() {
  var rgxName = /^[A-Za-z0-9][a-z]{3,15}[0-9]*$/;
  if (rgxName.test(nameSite.value)) {
    nameSite.classList.remove("is-invalid");
    nameSite.classList.add("is-valid");
    return true;
  } else {
    nameSite.classList.add("is-invalid");
    nameSite.classList.remove("is-valid");
    alertError.style.display = "block";
    PNameUrl.classList.replace("d-none", "d-block");
    overlay.style.display = "block";
    return false;
  }
}

function validUrl() {
  var rgxUrl = /^https:\/\//;
  if (rgxUrl.test(urlSite.value)) {
    urlSite.classList.remove("is-invalid");
    urlSite.classList.add("is-valid");
    return true;
  } else {
    urlSite.classList.add("is-invalid");
    urlSite.classList.remove("is-valid");
    alertError.style.display = "block";
    PNameUrl.classList.replace("d-none", "d-block");
    overlay.style.display = "block";
    return false;
  }
}

//catch value
btnSite.addEventListener("click", function () {
  if (validName() === true && validUrl() === true) {
    var formURL = {
      URL_name: nameSite.value,
      URL_address: urlSite.value,
    };
    arr.push(formURL);
    localStorage.setItem("urlInfo", JSON.stringify(arr));
    clearData();
    showData();
    console.log(arr);
    // Remove the "is-valid" class from the input fields
    nameSite.classList.remove("is-valid");
    urlSite.classList.remove("is-valid");
  } else if (validName() === false || validUrl() === false) {
    nameSite.classList.toggle("is-invalid", !validName());
    urlSite.classList.toggle("is-invalid", !validUrl());
  }
});
// Remove the "is-valid" class from the input fields
nameSite.classList.remove("is-valid");
urlSite.classList.remove("is-valid");
// Remove the "is-valid" class from the input fields
nameSite.classList.remove("is-valid");
urlSite.classList.remove("is-valid");

//function clear data from input

function clearData() {
  nameSite.value = "";
  urlSite.value = "";
}

//function show data
function showData() {
  let show = "";
  for (let i = 0; i < arr.length; i++) {
    show += `
        <tr>
            <td>${i + 1}</td>
            <td>
  <i class="fa-brands fa-${arr[
    i
  ].URL_name.toLowerCase()} fa-xl me-2 fw-bold ${getIconColor(
      arr[i].URL_name
    )}"></i>
  <span class="fs-5 fw-bold">${arr[i].URL_name}</span>
</td>
            <td><button class="btn btn-success" id="btnLink" OnClick= "openPage(${i})" ><i class="fa-solid fa-eye pe-2"></i> View</button></td>
            <td><button onclick="updateForm(${[
              i,
            ]})" class="btn btn-warning"><i class="fa-solid fa-pen pe-2 text-white"></i>Update</button></td>
            <td><button class="btn btn-danger text-light" OnClick= "clearArr(${i})"> <i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("showData").innerHTML = show;
  let btnDelete = document.getElementById("deleteAll");
  if (arr.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteALL()" class='m-2 w-100 btncolor rounded px-3 text-white spacing pt-2 pb-2 rounded-5 border-0'>Delete All (${arr.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}

function openPage(index) {
  parent.open(arr[index].URL_address);
}

//function Delete data
function clearArr(index) {
  arr.splice(index, 1);
  localStorage.setItem("urlInfo", JSON.stringify(arr));
  showData();
}

//hide and show alert
closeAlert.addEventListener("click", function () {
  alertError.style.display = "none";
  overlay.style.display = "none";
});

// function search
function searched(item) {
  let show = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].URL_name.toLowerCase().includes(item.toLowerCase())) {
      show += `
        <tr>
            <td>${i + 1}</td>
            <td>
            <i class="fa-brands fa-${arr[
              i
            ].URL_name.toLowerCase()} fa-xl me-2 fw-bold ${getIconColor(
        arr[i].URL_name
      )}"></i>
            <span class="fs-5 fw-bold">${arr[i].URL_name}</span>
          </td>
            <td><button class="btn btn-success" id="btnLink" OnClick= "openPage(${i})" ><i class="fa-solid fa-eye pe-2"></i> View</button></td>
            <td><button onclick="updateForm(${[
              i,
            ]})" class="btn btn-warning"><i class="fa-solid fa-pen pe-2"></i>Update</button></td>
            <td><button class="btn btn-danger text-light" OnClick= "clearArr(${i})"> <i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `;
    }
  }
  document.getElementById("showData").innerHTML = show;
}
searchURL.addEventListener("input", function () {
  searched(searchURL.value);
});

function updateForm(index) {
  objectIndex = index;
  nameSite.value = arr[index].URL_name;
  urlSite.value = arr[index].URL_address;
  btnUpdate.classList.remove("d-none");
  btnSite.classList.add("d-none");
}
function updateData() {
  arr[objectIndex].URL_name = nameSite.value;
  arr[objectIndex].URL_address = urlSite.value;
  btnUpdate.classList.add("d-none");
  btnSite.classList.remove("d-none");
  showData();
  localStorage.setItem("allProduct", JSON.stringify(arr));
  clearData();
}

function deleteALL() {
  localStorage.clear();
  arr.splice(0);
  showData();
}
function getIconColor(iconName) {
  switch (iconName.toLowerCase()) {
    case "facebook":
    case "linkedin":
      return "text-primary";
    case "twitter":
      return "text-info";
    case "instagram":
      return "text-danger";
    case "google":
      return "text-warning";
    default:
      return "text-secondary";
  }
}
