// CRUD 
//  level 1 js - php - angular - react ... 

// c >> create (take data in system)

// r >> retive (dispaly show data)

// u >> update 

// d >> delete 

// s >> search 

//global varibale

var nameInput = document.getElementById('ProductName');
var categoryInput = document.getElementById('ProductCategory');
var priceInput = document.getElementById('ProductPrice');
var descriptionInput = document.getElementById('ProductDescription');
var tbody = document.getElementById('tbody');
var searchInput = document.querySelector('#searchInput');
var addUpdateButton = document.querySelector('#addUpdateButton');
var pNameAlert = document.querySelector('#pNameAlert');
var fillAllAlert = document.querySelector('#fillAllAlert');
let updateBttom = '';
let deleteBttom = '';


var updatedProduct;

var productsList; // datatabase

//for now user if local storage is empty فانا بساوي الاراي بحاجه فاضيه هتديني ارور 

if (localStorage.getItem('productData') === null) {//for first use
    productsList = [];
}
else {
    productsList = JSON.parse(localStorage.getItem('productData'));
    showData();//عشان يعرض الداتا اول ما يعمل رفرش 
}



addUpdateButton.addEventListener('click', function () {
    createProduct();
    nameInput.classList.remove('is-valid')
    if (nameInput.value != '' && checkValidation() == false) {
        pNameAlert.style.border = '.2rem solid red';
    }
})

function createProduct() {
    if (checkValidation()) {
        if (categoryInput.value != '' && priceInput.value != '' && descriptionInput.value != '') {
            if (addUpdateButton.innerHTML.includes('Add Product')) {
                var product = {

                    pName: nameInput.value,
                    pCategory: categoryInput.value,
                    pPrice: priceInput.value,
                    pDescription: descriptionInput.value

                };


                productsList.push(product);

                localStorage.setItem('productData', JSON.stringify(productsList));

                //call function after add product in array
                showData();

                //empty form
                clearForm();
            }
            else {
                saveUpdate(updatedProduct)
                addUpdateButton.innerHTML = 'Add Product'
            }
        }
        else {
            fillAllAlert.classList.remove('d-none')
        }
    }
}

function clearForm() {
    nameInput.value = '';
    categoryInput.value = '';
    priceInput.value = '';
    descriptionInput.value = '';
    nameInput.classList.remove('is-invalid');
    nameInput.classList.remove('is-valid');
    pNameAlert.classList.add('d-none');
    fillAllAlert.classList.add('d-none')

}


function showData() {
    let tr = '';


    for (var i = 0; i < productsList.length; i++) {

        tr = document.createElement('tr')
        let idTd = document.createElement('td')
        let pNameTd = document.createElement('td')
        let pCategoryTd = document.createElement('td')
        let pPriceTd = document.createElement('td')
        let pDescriptionTd = document.createElement('td')
        let updateTd = document.createElement('td')
        let updateBtn = document.createElement('button')
        let updateIcon = document.createElement('i')
        let deletTd = document.createElement('td')
        let deletBtn = document.createElement('button')
        let deletIcon = document.createElement('i')

        tr.append(idTd);
        tr.append(pNameTd);
        tr.append(pCategoryTd);
        tr.append(pPriceTd);
        tr.append(pDescriptionTd);
        tr.append(updateTd);
        tr.append(deletTd);
        updateTd.append(updateBtn);
        updateBtn.append(updateIcon);
        deletTd.append(deletBtn);
        deletBtn.append(deletIcon);

        idTd.innerText = i;
        pNameTd.innerText = productsList[i].pName;
        pCategoryTd.innerText = productsList[i].pCategory;
        pPriceTd.innerText = productsList[i].pPrice;
        pDescriptionTd.innerText = productsList[i].pDescription;

        updateBtn.classList.add('btn');
        updateBtn.classList.add('btn-outline-warning');
        updateBtn.classList.add('updateBtn');

        deletBtn.classList.add('btn');
        deletBtn.classList.add('btn-outline-danger');
        deletBtn.classList.add('deletBtn');

        updateBtn.setAttribute('index', i);
        deletBtn.setAttribute('index', i);

        updateIcon.classList.add('fa-solid');
        updateIcon.classList.add('fa-pen');

        deletIcon.classList.add('fa-solid');
        deletIcon.classList.add('fa-trash-can');


        // tbody.append(tr);

        tbody.appendChild(tr);



    }


    updateBttom = document.querySelectorAll('.updateBtn')
    deleteBttom = document.querySelectorAll('.deletBtn')

}

let updbuttomsArray = Array.from(updateBttom)


let deletbuttomsArray = Array.from(deleteBttom)



tbody.addEventListener('click', function (e) {
    console.log(e.target);
    if (e.target.classList.contains('updateBtn')) {
        // let index = updbuttomsArray[i].getAttribute('index');
        let index = updbuttomsArray.indexOf(e.target)
        console.log(updbuttomsArray);
        console.log(index);
        console.log(e.target);
        updateProduct(index);
    }
    if (e.target.classList.contains('deletBtn')) {
        let index = deletbuttomsArray.indexOf(e.target)
        console.log(index);
        deleteProduct(index);
    }
})
// if (updateBttom != '' && deleteBttom != ''){
// for (let i = 0; i < updbuttomsArray.length; i++) {
//     updbuttomsArray[i].addEventListener('click', function (e) {

//         //let index = updbuttomsArray[i].getAttribute('index');
//         let index = updbuttomsArray.indexOf(e.target)
//         console.log(index);
//         console.log(e.target);
//         updateProduct(index);

//     })

//     deletbuttomsArray[i].addEventListener('click', function (e) {
//         //let index = deletbuttomsArray[i].getAttribute('index');
//          let index = productsList.indexOf(e.target)
//         console.log(index);
//         deleteProduct(index);

//     })
// }
// }


function deleteOldTr() {
    tbody.innerHTML = '';
}

function deleteProduct(index) {

    productsList.splice(index, 1);
    localStorage.setItem('productData', JSON.stringify(productsList));
    deleteOldTr();
    showData();
    console.log(productsList, index);

}


searchInput.addEventListener('input', search)


function search() {
    var trs = '';
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].pName.toLowerCase().includes(searchInput.value.toLowerCase())) {

            trs += `<tr>
            <td>${i}</td>
            <td>${productsList[i].pName}</td>
            <td>${productsList[i].pCategory}</td>
            <td>${productsList[i].pPrice}</td>
            <td>${productsList[i].pDescription}</td>
            <td>
                <button onclick="updateProduct(${i});" class="btn btn-outline-warning">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </td>
            <td>
                <button onclick="deleteProduct(${i});" class="btn btn-outline-danger">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>`
        }
    }
    console.log(trs);
    tbody.innerHTML = trs;
}





function updateProduct(updatedProductIndex) {
    updatedProduct = updatedProductIndex;
    nameInput.value = productsList[updatedProductIndex].pName;
    categoryInput.value = productsList[updatedProductIndex].pCategory;
    priceInput.value = productsList[updatedProductIndex].pPrice;
    descriptionInput.value = productsList[updatedProductIndex].pDescription;
    addUpdateButton.innerHTML = 'Update Product'
}

function saveUpdate(updatedProduct) {

    var product = {

        pName: nameInput.value,
        pCategory: categoryInput.value,
        pPrice: priceInput.value,
        pDescription: descriptionInput.value

    };

    productsList.splice(updatedProduct, 1, product);
    localStorage.setItem('productData', JSON.stringify(productsList))
    deleteOldTr();
    //call function after add product in array
    showData();

    //empty form
    clearForm();
}



//validation Name input
nameInput.addEventListener('blur', function () {
    if (nameInput.value != '') {
        checkValidation();
    }
    else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.remove('is-valid');
        pNameAlert.classList.add('d-none');
    }
});



function checkValidation() {

    var myRegex = /^[A-Z][a-z]{3,10}[0-9]{0,4}$/;

    if (/^[A-Z]/.test(nameInput.value)) {

        if (/[a-z]{3,10}[0-9]{0,4}/.test(nameInput.value)) {

            if (/[a-z]{3,10}[0-9]{0,4}$/.test(nameInput.value)) {
                nameInput.classList.add('is-valid');
                nameInput.classList.remove('is-invalid');
                pNameAlert.classList.add('d-none');
                return true;
            }
            else {
                nameInput.classList.add('is-invalid');
                nameInput.classList.remove('is-valid');
                pNameAlert.classList.remove('d-none');
                pNameAlert.innerHTML = 'numbers must be less than 4 numbers only'
                return false;
            }

        }

        else {
            nameInput.classList.add('is-invalid');
            nameInput.classList.remove('is-valid');
            pNameAlert.classList.remove('d-none');
            pNameAlert.innerHTML = 'write a product name from 3 to 10 lettes with only first letter is capital'
            return false;
        }
    }
    else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        pNameAlert.classList.remove('d-none');
        pNameAlert.innerHTML = 'Start with Capital Letter'
        return false;
    }



    // if (myRegex.test(nameInput.value)) {



    //     nameInput.classList.add('is-valid');
    //     nameInput.classList.remove('is-invalid');
    //     pNameAlert.classList.add('d-none');
    //     return true;
    // }
    // else {
    //     nameInput.classList.add('is-invalid');
    //     nameInput.classList.remove('is-valid');
    //     pNameAlert.classList.remove('d-none');
    //     pNameAlert.innerHTML = 'Start with Capital Letter'
    //     return false;
    // }
}