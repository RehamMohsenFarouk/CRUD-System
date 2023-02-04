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
    if (nameInput.value !='' && checkValidation()==false){
        pNameAlert.style.border ='.2rem solid red'; 
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

    var trs = '';

    for (var i = 0; i < productsList.length; i++) {

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


    tbody.innerHTML = trs;

}

function deleteProduct(index) {

    productsList.splice(index, 1);
    localStorage.setItem('productData', JSON.stringify(productsList));
    showData();

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



var updatedProduct;

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

    //call function after add product in array
    showData();

    //empty form
    clearForm();
}


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