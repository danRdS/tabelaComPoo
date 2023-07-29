import { User } from "./Usuario.js";

const joquebede = new User('Joquebede', 28);
const moshé = new User('Moshé', 120);
const deres = new User('Deres', 33);
const jodebergues = new User('Jodebergues', 58);

const usuarios = new Array(joquebede, moshé, deres, jodebergues);

const fieldMainTable = document.querySelector('.fieldMainTable');
const tbody = document.getElementById('corpoTabela');

window.onload = () => {
    scrollTop();

    mostraTabela(usuarios);
}

function mostraTabela(array){
    tbody.innerHTML = '';
    for(let usuario of array){
        tbody.innerHTML +=  `<tr>
                                 <td align="center" id="td1">${usuario.id}</td>
                                 <td align="center" id="td2">${usuario.nome}</td>
                                 <td align="center" id="td3">${usuario.idade}</td>
                            </tr>`;
    }
}

const container = document.querySelector('.container');
const form = document.querySelector('.form');
const btnSearch = document.getElementById('search');
const inputId = document.getElementById('numId');

const loadingMessage = document.querySelector('.loadingMessage');
const tableResult = document.querySelector('.tableResult');
const table = document.querySelector('.tableResult table');
const tableId = document.getElementById('tableId');
const tableNome = document.getElementById('tableNome');
const tableIdade = document.getElementById('tableIdade');

const fieldButtons = document.querySelector('.field-buttons');
const btnShowFormChanges = document.getElementById('showFormChanges');
const btnViewTable = document.querySelector('#viewTable');
const sectionFormChanges = document.getElementById('sectionFormChanges');
const formChanges = document.getElementById('formChanges');
const textName = document.getElementById('textName');
const numIdade = document.getElementById('numIdade');
const btnCancelChanges = document.getElementById('cancelChanges');
const btnSaveChanges = document.getElementById('saveChanges');
const btnRemoveUser = document.getElementById('remover');

const modalDeleteUser = document.querySelector('.modalDeleteUser');
const popupConfirmDeleteUser = document.querySelector('.popupConfirmDeleteUser');
const cancelDeleteUser = document.getElementById('cancelDeleteUser');
const confirmDeleteUser = document.getElementById('confirmDeleteUser');
const popupDeleteConfirmed = document.querySelector('.popupDeleteConfirmed');
const deleteOK = document.getElementById('deleteOK');

const modalErrorMessage = document.querySelector('.modalErrorMessage');
const spanError = document.getElementById('errorMessage');
const btnCloseError = document.getElementById('closeError');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

let key;

btnSearch.onclick = () => {
    key = inputId.value;
    if(key.length > 0){
        obterUsuario(key, usuarios, mostrarUsuario);
    }
};

function obterUsuario(id, array, mostrarUsuario){
    for(let user of array){
        if(id == user.id){
            const usuario = {
                id: user.id,
                nome: user.nome,
                idade: user.idade
            }
            mostrarUsuario(true, id, usuario);
            return;
        }
    }
    mostrarUsuario(false, id);
}

function mostrarUsuario(resultado, id, usuario){
    loadingMessage.classList.add('show');
    tableResult.classList.remove('visible');
    modalErrorMessage.classList.remove('visible');
    
    setTimeout(()=>{
        loadingMessage.classList.remove('show');
        scrollTop();
        
        modalErrorMessage.classList.remove('visible');
        if(resultado){
            fieldMainTable.classList.add('hidden');
            mainTable.classList.add('hidden');
            tableResult.classList.add('visible');
            tableId.innerText = usuario.id;
            tableNome.innerText = usuario.nome;
            tableIdade.innerText = usuario.idade;

            textName.value = usuario.nome;
            numIdade.value = usuario.idade;

            btnRemoveUser.addEventListener('click', () => {
                modalDeleteUser.classList.add('visible');
            })

            cancelDeleteUser.addEventListener('click', () => {
                modalDeleteUser.classList.remove('visible');
            })

            confirmDeleteUser.addEventListener('click', () => {
                popupConfirmDeleteUser.classList.add('hidden');
                popupDeleteConfirmed.classList.add('visible');              
            })
            
            deleteOK.addEventListener('click', () => {
                btnViewTable.click();
                setTimeout(() => {
                    popupDeleteConfirmed.classList.remove('visible');
                    modalDeleteUser.classList.remove('visible');
                    deleteUser(key);
                }, 1400)
                setTimeout(() => {
                    popupConfirmDeleteUser.classList.remove('hidden');
                }, 2300)
            })

            btnShowFormChanges.addEventListener('click', () => {
                table.classList.add('hidden');
                fieldButtons.classList.add('hidden');

                textName.value = usuario.nome;
                numIdade.value = usuario.idade;

                setTimeout(() => {
                    sectionFormChanges.classList.add('show');
                }, 500)
            });

            const modalSaveChanges = document.querySelector('.modalSaveChanges');
            const btnOk = document.getElementById('Ok');

            btnSaveChanges.addEventListener('click', () => {  
                if(textName.value.length > 0 && numIdade.value.length > 0){
                    usuario.nome = textName.value;
                    usuario.idade = numIdade.value;
                    
                    tableNome.innerText = usuario.nome;
                    tableIdade.innerText = usuario.idade;
                    
                    modalSaveChanges.classList.add('visible');

                    btnOk.addEventListener('click', () => {
                        modalSaveChanges.classList.remove('visible');
                        setTimeout(() => {
                            sectionFormChanges.classList.remove('show');
                            scrollTop();
                            btnShowFormChanges.classList.remove('hidden');
                            table.classList.remove('hidden');
                            fieldButtons.classList.remove('hidden');
                            atualiza(key, usuario.nome, usuario.idade);
                        }, 400);
                    })
                }

            })           
                        
            textName.addEventListener('keypress', (e)=>{
                if(e.key === 'Enter' && textName.value.length > 0){
                    btnSaveChanges.click();
                }
            })

            numIdade.addEventListener('keypress', (e)=>{
                if(e.key === 'Enter' && numIdade.value.length >0){
                    btnSaveChanges.click();
                }
            })

        } else {
            inputId.blur();
            container.classList.add('errorMessage');
            modalErrorMessage.classList.add('visible');
            tableResult.classList.remove('visible');
            spanError.innerHTML = `O ID "${id}" não está presente na lista. Por favor, tente outro.`;
        }
    }, 2000);
}

const backToMainTable = document.querySelector('.backToMainTable');

btnViewTable.addEventListener('click', ()=>{
    backToMainTable.classList.add('visible');
    setTimeout(()=>{
        tableResult.classList.remove('visible');
    }, 1500)
    setTimeout(()=>{
        mainTable.classList.remove('hidden');
        fieldMainTable.classList.remove('hidden');
        backToMainTable.classList.remove('visible');
        scrollTop();
    }, 2000)
})

function atualiza(id, nome, idade){
    usuarios.forEach((item) => {
        if(item.id == id){
            item.nome = nome;
            item.idade = idade;
        }
        mostraTabela(usuarios)
    });
}


//DELETAR USUARIO
function deleteUser(id){
    usuarios.forEach((usuario, index) => {
        if(usuario.id == id){
            usuarios.splice(index, 1);
        }
    });
    mostraTabela(usuarios);
}

btnCloseError.onclick = () => {
    setTimeout(()=>{
        modalErrorMessage.classList.remove('visible');
        inputId.focus();
    }, 500);
    setTimeout(() => {
        container.classList.remove('errorMessage');
    }, 700);
};

formChanges.addEventListener('submit', (e) => e.preventDefault());

btnCancelChanges.addEventListener('click', () => {
    setTimeout(()=>{
        sectionFormChanges.classList.remove('show');
    }, 400)
    setTimeout(()=>{
        scrollTop();
        table.classList.remove('hidden');
        fieldButtons.classList.remove('hidden');
        btnShowFormChanges.classList.remove('hidden');
    }, 800);

});

window.onscroll = () => scrollFunction();

function scrollFunction(){
    if(document.body.scrollTop > 70 || document.documentElement.scrollTop > 70){
        btnToTop.classList.add('visible');
    } else {
        btnToTop.classList.remove('visible');
    }
}

function scrollTop(){
    document.documentElement.scrollTop = 0;
}

const btnAddUser = document.getElementById('adicionar');
const buttonAddArea = document.querySelector('.buttonAddArea');
const newUserData = document.querySelector('.newUserData');
const formNewUserData = document.querySelector('#formNewUserData');
const btnBack = document.getElementById('back');
const btnConfirmAdd = document.getElementById('confirmAdd');

const novoUsuario = document.getElementById('nomeUsuario');
const novoUsuarioIdade = document.getElementById('idadeUsuario');

btnAddUser.addEventListener('click', ()=>{
    buttonAddArea.classList.add('clicked');
    setTimeout(()=>{
        scrollTop();
        newUserData.classList.add('visible');
        fieldMainTable.classList.add('hidden');
        btnAddUser.classList.add('hidden');
        buttonAddArea.classList.remove('clicked');
    }, 700);
})

formNewUserData.addEventListener('submit', (e)=>{
    e.preventDefault();
})

btnBack.addEventListener('click', () => {
    backToMainTable.classList.add('visible');
    novoUsuario.removeAttribute('required');
    novoUsuarioIdade.removeAttribute('required');
    setTimeout(()=>{
        newUserData.classList.remove('visible');
        backToMainTable.classList.remove('visible');
        fieldMainTable.classList.remove('hidden');
        btnAddUser.classList.remove('hidden');
        apagaDadosNovoUsuario();
        novoUsuario.setAttribute('required', 'required');
        novoUsuarioIdade.setAttribute('required', 'required');
    }, 2000);
})

const popupSaveNewUser = document.querySelector('.popupSaveNewUser');
const alertNewUserAdd = document.getElementById('alertNewUserAdd');

btnConfirmAdd.addEventListener('click', () => {
    if(novoUsuario.value.length > 0 && novoUsuarioIdade.value.length > 0){
        modalSaveNewuser.classList.add('visible');
        popupSaveNewUser.classList.add('show');
        alertNewUserAdd.innerText = 'Novo usuário adicionado';
    } 
});

const modalSaveNewuser = document.querySelector('.modalSaveNewUser');
const userAddOk = document.getElementById('userAddOk');

userAddOk.addEventListener('click', () => {
        let newUser = new User(novoUsuario.value, novoUsuarioIdade.value);
        usuarios.push(newUser);

        backToMainTable.classList.add('visible');
        popupSaveNewUser.classList.remove('show');
        mostraTabela(usuarios);

        setTimeout(()=>{
            newUserData.classList.remove('visible');
            backToMainTable.classList.remove('visible');
            modalSaveNewuser.classList.remove('visible');
            fieldMainTable.classList.remove('hidden');
            btnAddUser.classList.remove('hidden');
            apagaDadosNovoUsuario();
        }, 2000);
});

function apagaDadosNovoUsuario(){
    novoUsuario.value = '';
    novoUsuarioIdade.value = '';
}

const btnToTop = document.getElementById('toTop');

btnToTop.addEventListener('click', () => {
    scrollTop();
})