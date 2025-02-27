/**CRUDS !! */
//Creat Read Update Delete Search
/*MANAGEMENT PROGRAM*/ 
/*!get elements **/
let title= document.getElementById('title');
let price= document.getElementById('price');
let tax= document.getElementById('tax');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('submit');
let tr=document.getElementsByClassName('tr');
let mode='create'; //a variable that makes choose between two modes from the button create to button update
let emptyy; //an empty let(variable) we use when we need to take local data to another place (المتغير الوهمي)
console.log(title,price,tax,ads,discount,total,count,category,submit); //always check elements
//**get total price!*
let elements=[price,tax,ads,discount]; //put needed elements in one array
//we make a function for calculating the total price
function getTotal() {
  if (price.value!='') //if the price section is empty the calculation won't work
      {
      let result= (+price.value + +tax.value + +ads.value) - +discount.value;
      total.innerHTML=result;
      total.style.background='#040'; //turns to green when showing result
  }else{
      total.innerHTML='0.00'; 
      total.style.background='rgb(172, 11, 0)';
  }
 }
//use forEach funtion to apply addEventlistener on every element
elements.forEach( function (element) {
   element.addEventListener('keyup', getTotal);//when envoking a function in addEventlistener dont use ()
})
//**create product*!
//best place where to keep data like object is in an array
//we (create read update delete and search) objects and data in the array
let dataPro; //creat array
//if the product data in localstorage is not empty != means not equal
if (localStorage.product!=null) {
    dataPro=JSON.parse(localStorage.product); //take that data and remove stringfy from it and save it in localstogare
}else{
    dataPro=[];  //if there is no data keep it empty
}
submit.addEventListener('click', function () {
    let newPro= /*put the properties and their values in an object */
    {
        title:title.value.toUpperCase(), 
        price:price.value, 
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toUpperCase(),
      }
    //**count!*
    if (title.value!='' 
      && price.vaule!='' 
      && category.value!=''
      && newPro.count<101) {
      if (mode==='create') {
        if (newPro.count>1) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro); //add every object created to the array
          }
        }else{
          dataPro.push(newPro); //If any value less than one is entered
        } 
      }else{
       dataPro[emptyy]=newPro; //update value of an object already created
       mode='create'//change back to create after finishing updating
       submit.innerHTML='create'; //bring back the btn create
       count.style.display='block';
      }
      clearData(); //to clear inputs after clicking creat
    }
  //save on localstorage
    localStorage.setItem('product', JSON.stringify(dataPro)); //save datapro in the key 'product' in localstorage and change it to string
    console.log(newPro); //we check the objects
    console.log(localStorage.getItem('product'));
    showData(); //to show data after click
} )
//*clear inputs**!
function clearData() //a function that clears inputs works when clicking create
 {
    title.value='';
    price.value='';
    tax.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//*read**!
function showData() {
    getTotal() //to allways refresh total input
    let table=''; //we make a new let
    //to show data in the table we put it in a loop
    for (let i=0;i<dataPro.length; i++) {
       table+= //everytime it loops it shows data like this
    `
    <tr class="tr">
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].tax}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td> 
      <td>${dataPro[i].category}</td> 
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>         
    </tr>
    `
    }
    // تحديث الجدول بعد انتهاء الحلقة
    document.getElementById('tbody').innerHTML= table;
    //**dellet all */
    let btnDelete = document.getElementById('deleteAll');
      if (dataPro.length>0) {
        btnDelete.innerHTML= "<button onclick='deleteAll()'>delete all</button>";
      }else{
        btnDelete.innerHTML='';
      }
    
}
showData() //we invoked the fuction to always be shown
//*delete!**
//make a function to delete data and give (i) as a parameter
function deleteData(i) {
    dataPro.splice(i,1); //use splice to delete data from array
    localStorage.product=JSON.stringify(dataPro); //make the changes appear in local storage
    showData();
    console.log('element removed');
}
function deleteAll() {
    localStorage.removeItem('product'); //remove 'product' from localstorage
    dataPro.splice(0); //remoeve objects (data) from the array
    showData(); //refresh table
    console.log('delete all data'); //allways check if the function is working
}
//**update*
//a function that moves table data elements in the input erea to update it later
function updateData(i) {
  title.value=dataPro[i].title; //take the value and move it to appear in the right input
  price.value=dataPro[i].price;
  tax.value=dataPro[i].tax;
  ads.value=dataPro[i].ads;
  discount.value=dataPro[i].discount;
  category.value=dataPro[i].category;
  count.style.display='none'; //hide the count input
  getTotal(); //we envoke this fuction to calculate the total when update function starts
  if (tr[i].style.background='rgba(245, 1, 74, 0.33)') //coloring the row every time we choose to update one
    {
    showData();
    tr[i].style.background='rgba(245, 1, 74, 0.33)';
  }
  scroll({
    top:0 //it scrolls back to top
  })
  mode='update'; //change mode from create to update
  submit.innerHTML='update';
  emptyy=i; //we used (المتغير الوهمي) because we need it in submit fucntion
  console.log(i);
}
//**search!*
let searchTitle=document.getElementById('searchTitle');
let searchCategory=document.getElementById('searchCategory');
let search=document.getElementById('search');
searchTitle.addEventListener('click',function () {
  getSearchmode(this.id);
});
searchCategory.addEventListener('click',function () {
  getSearchmode(this.id);
});
//we use two modes to search data
let searchMode= 'title'; //create the mode
//this fuction has 2 modes search by title and search by category
function getSearchmode(id) {
  if (id=='searchTitle') {
    searchMode='title';
  }else{
    searchMode='category';
  }
  search.placeholder='search by '+searchMode;
  search.addEventListener('keyup',function () {
    searchData(this.value); //when typing on search input search function works
  })
  search.focus(); //when clicking search button search input will be focused
  search.value='';
  showData();
  console.log(id); //check id
  console.log(searchMode); //check searchmode
}
//this is the search fuction
function searchData(value) {
  let table=''; //make new empty variable 
  for (let i=0; i<dataPro.length; i++) //always use loop for search
    {
    if (searchMode=='title') {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
       table+= //everytime it loops it shows data like this
    `
    <tr class="tr">
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].tax}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td> 
      <td>${dataPro[i].category}</td> 
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>         
    </tr>
    `
      }
    }else{
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) //to make search able in lower and uper case
      {
         table+= //everytime it loops it shows this data table
        `
         <tr class="tr">
           <td>${i}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].tax}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].count}</td> 
           <td>${dataPro[i].category}</td> 
           <td><button onclick="updateData(${i})" id="update">update</button></td>
           <td><button onclick="deleteData(${i})" id="delete">delete</button></td>         
         </tr>
        `
      }
    }
  }
  // تحديث الجدول بعد انتهاء الحلقة
  document.getElementById('tbody').innerHTML= table;
}





