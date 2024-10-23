let title =document.getElementById("title")
let price =document.getElementById("price")
let taxes =document.getElementById("taxes")
let ads =document.getElementById("ads")
let discount =document.getElementById("discount")
let total =document.getElementById("total")
let count =document.getElementById("count")
let category =document.getElementById("category")
let submit =document.getElementById("submit")
let btnDelete=document.getElementById("deleteAll")
let mood ="create"
let temp ;
// function git total
function gitTotal() {
    if (price.value!="") {
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value  
        total.innerHTML=result
        total.style.backgroundColor="green"
    }
    else {
        total.innerHTML=""
        total.style.backgroundColor="#a00d02"
    }
}
price.onkeyup=gitTotal
taxes.onkeyup=gitTotal
ads.onkeyup=gitTotal
discount.onkeyup=gitTotal




// function create 
let datapro;
if(localStorage.product!= null){
    datapro =JSON.parse(localStorage.product)
}
else{
    datapro=[];
}

function create() {
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    // count 

    if (title.value != '' && price.value!='' && category.value != '' && count.value <= 100) {
        
        if(mood ==="create"){
            
        if(newpro.count > 1){
            for (let i = 0; i < newpro.count ; i++) {
                datapro.push(newpro)
            }
        }else{
            datapro.push(newpro)
        }

        }else{
            datapro[temp]=newpro;
            mood = "create";
            submit.innerHTML="create"
            count.style.display="block"
           

        }
        clearData()
    }


    localStorage.setItem("product" , JSON.stringify(datapro))

    showeData()

}

submit.onclick=create


// clear inputs

function clearData() {
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
}


// read data

function showeData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table +=`
        <tr>
            <td>${i+1}</td>
            <td> ${datapro[i].title} </td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td> <button onclick="updateData(${i})" id="update"> update</button> </td>
            <td> <button onclick="deleteData(${i}) " id="delete"> delete</button> </td>
            </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table



    
    if(datapro.length > 0){
        btnDelete.innerHTML=`
        <td> <button> delete All (${datapro.length}) </button> </td>
        `
    }else{
        btnDelete.innerHTML=""
    }
    gitTotal()

}
showeData()

function deleteData(i) {

    datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro)
    showeData()

}



// delete All

btnDelete.addEventListener("click" , (eo)=>{
    localStorage.clear()
    datapro.splice(0)
    showeData()
})



// update function

function updateData(i) {
    title.value=datapro[i].title
    price.value=datapro[i].price
    taxes.value=datapro[i].taxes
    ads.value=datapro[i].ads
    discount.value=datapro[i].discount
    gitTotal() 
    count.style.display="none"

    category.value=datapro[i].category
    submit.innerHTML="update"
    mood="update"
    temp = i ;
    scroll({
        top:0,
        behavior:"smooth"
    });

}

// function search

let searchMood="title" ;

function getSearchMood(id) {
    let search =document.getElementById("search")
    if(id=="searchTitle"){
        searchMood="title";
        search.setAttribute("placeholder" , "search by title");
      

    }else{
        searchMood="category"
        search.setAttribute("placeholder" , "search by category");
    }

    search.focus()
    search.value=''
    showeData()
}


function searchData(value) {
    let table ='';
    if (searchMood=='title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table +=
                `<tr>
                    <td>${i}</td>
                    <td> ${datapro[i].title} </td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td> <button onclick="updateData(${i})" id="update"> update</button> </td>
                    <td> <button onclick="deleteData(${i}) " id="delete"> delete</button> </td>
                </tr>`
            }
        }

    }else{
        
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table +=
                `<tr>
                    <td>${i}</td>
                    <td> ${datapro[i].title} </td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td> <button onclick="updateData(${i})" id="update"> update</button> </td>
                    <td> <button onclick="deleteData(${i}) " id="delete"> delete</button> </td>
                </tr>`
            }
        }
    }

    document.getElementById("tbody").innerHTML = table

}


