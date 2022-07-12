(() => {
    const inputValueEl = document.querySelector('#user__value');
    const btnAddItemEl = document.querySelector('#add__item');
    const listEl = document.querySelector('.list');
    const btnCheckAllEl = document.querySelector('#check__all');
    const btnDeleteAllEl = document.querySelector('#delete__all');

    function onAddToDoList(){
        let userValue = inputValueEl.value.trim();
        
        if (userValue !== '') {
            const newElLi = document.createElement('li');
            newElLi.innerText = userValue;
            
            const newElInputInLi = document.createElement('input');
            newElInputInLi.type = 'checkbox';

            const newBtnDelLi = document.createElement('button');
            newBtnDelLi.innerText = 'Delete line';

            listEl.append(newElLi);
            newElLi.append(newElInputInLi, newBtnDelLi);

            inputValueEl.value = ''; 

            function onAddStyleLineThrough(){  
                if (!newElInputInLi.checked) {
                    newElLi.classList.remove('line__through');               
                } else {
                    newElLi.classList.add('line__through');
                }
            }

            function onCheckAll(){
                const allInput = document.querySelectorAll('input');
        
                Array.from(allInput).forEach(e => {                    
                    e.checked = true;   
                });    
            }

            listEl.addEventListener('click', (event) => {  
                if (event.target.closest('button')) event.target.closest('li').remove();
                if (event.target.closest('input')) onAddStyleLineThrough();            
            });
          
            btnCheckAllEl.addEventListener('click', () => {
                onCheckAll();
                onAddStyleLineThrough();
            });

            btnDeleteAllEl.addEventListener('click', () => newElLi.remove());    
            
        } else {
            alert('There is nothing to add!');
        }   
    }

    btnAddItemEl.addEventListener('click', onAddToDoList);
    
    inputValueEl.addEventListener('keydown', e => {
        if (e.code === 'Enter') onAddToDoList();        
    });
    
})();

//// Registration

(() => {
    let userAdmin = {
        login: 'useradmin@aa.ua',
        password: 'admin'
    };
    
    const formLoginEl = document.getElementById('registration');
    formLoginEl.addEventListener('click', e => {
        e.preventDefault();
    });

    const loginEl = document.getElementById('login');
    loginEl.disabled = true;
    
    const userLoginEl = document.getElementById('user__login');  
    const wrongLoginEl = document.getElementById('wrong__login'); 
    const userPasswordEl = document.getElementById('user__password');   
       
    userLoginEl.addEventListener('change', () => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let userLoginValue = userLoginEl.value.trim();

        if (reg.test(userLoginValue) == true) {
            wrongLoginEl.classList.add('hiden'); 
            userLoginEl.classList.remove('border__red');
        } else {
            wrongLoginEl.classList.remove('hiden');
            userLoginEl.classList.add('border__red');             
            userLoginEl.value = '';
        }
    });

    formLoginEl.addEventListener('change', () => {        
        if (userLoginEl.value === '' || userPasswordEl.value.trim() === ''){           
            loginEl.disabled = true;
        } else {
            loginEl.disabled = false;
        }
    });
       
    function getRegistrationVerification () {
        let userPasswordValue = document.getElementById('user__password').value; 
        let userLoginValue = document.getElementById('user__login').value.toLowerCase().trim();
    
        if (userPasswordValue === userAdmin.password && userLoginValue === userAdmin.login){ 
            document.getElementById('to__do__list').classList.remove('display__none');
            document.getElementById('registration').classList.add('display__none');
        } else {
            document.getElementById('error__message').innerText = `Login (${userLoginValue}) or password (${userPasswordValue}) entered incorrectly!`;
            
            userLoginEl.value = '';
            userPasswordEl.value = '';
            loginEl.disabled = true;
        }    
    }
    
    loginEl.addEventListener('click', getRegistrationVerification);
})();