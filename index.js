const form = document.querySelector('form');
let isEdit = false;
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const amount = event.target.expenseAmount.value;
    const desc = event.target.expenseDesc.value;
    const category = event.target.category.value;
    console.log(amount,desc,category);

    const obj = {
        amount,
        desc,
        category
    }
    const getDataFromLocal = JSON.parse(localStorage.getItem('expenseList')) ?? [];
    // getDataFromLocal.push(obj);
    if(isEdit){
        getDataFromLocal[editIndex] = obj;
        isEdit = false;
    }else{
        getDataFromLocal.push(obj);
    }
    localStorage.setItem('expenseList',JSON.stringify(getDataFromLocal));
    displayUser();
    event.target.reset();
});

let editIndex;

function displayUser(){
    //showing expense list
    const allExpenseList = document.querySelector('ul');
    const getDataFromLocal = JSON.parse(localStorage.getItem('expenseList'));
    allExpenseList.innerHTML = '';
    for(let i=0; i<getDataFromLocal.length;i++){
        // console.log(getDataFromLocal[i]);
        const listItem = document.createElement('li');
        listItem.style.marginTop = '5px'
        listItem.textContent = ` $${getDataFromLocal[i].amount} - ${getDataFromLocal[i].desc} - ${getDataFromLocal[i].category}`
        allExpenseList.appendChild(listItem);

        //adding Delete button
        const dltBtn = document.createElement('button');
        dltBtn.textContent = 'Delete Expense'
        dltBtn.style.marginLeft = '5px'
        listItem.appendChild(dltBtn);

        dltBtn.addEventListener('click',function(event){
            const getDataFromLocal = JSON.parse(localStorage.getItem('expenseList'));
            getDataFromLocal.splice(0,1);
            localStorage.setItem('expenseList',JSON.stringify(getDataFromLocal));
            displayUser();
        })

        //adding Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit Expense';
        editBtn.style.marginLeft = '10px'
        listItem.appendChild(editBtn);

        editBtn.addEventListener('click',()=>{
            document.getElementById('expenseAmount').value = getDataFromLocal[i].amount;
            document.getElementById('expenseDesc').value = getDataFromLocal[i].desc;
            document.getElementById('category').value = getDataFromLocal[i].category;

            isEdit = true;
            editIndex = i;

            // Refresh the displayed expense list
            displayUser();
        });

    }

}

displayUser();