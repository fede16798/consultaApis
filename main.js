let modal = document.querySelector('.modal-background'); 
const btnCloseModal = document.querySelector('.btn-close');
let result = document.querySelector(".resultado");

const getById = async () => {
    let result, name, lastName, email;
    try {
        let id = parseInt(prompt("Please enter an id"));
        let info = await axios(`https://reqres.in/api/users/${id}`);
        name = info.data.data.first_name;
        lastName = info.data.data.last_name;
        email = info.data.data.email;
        console.log(info)
        result = messageById(name, lastName, email);
        openModal(result);        
    } catch (e) {
        console.log(e);
        const par = document.createElement('P');
        par.innerHTML = `<b>Se produjo un eror</b>`;
        openModal(par);
    }
}

document.getElementById("button-1").addEventListener("click", getById);

const messageById = (name, lastName, email) => {
    const frag = document.createDocumentFragment();
    const firstName = document.createElement("P");
    firstName.innerHTML = `Name: <b>${name}</b>`;
    const last_name = document.createElement("P");
    last_name.innerHTML = `Last name: <b>${lastName}</b>`;
    const mail = document.createElement("P");
    mail.innerHTML = `mail: <b>${email}</b>`;
    const div = document.createElement("DIV");

    div.appendChild(firstName);
    div.appendChild(last_name);
    div.appendChild(mail);
    frag.appendChild(div);
    return frag;
}

const openModal = (message) => {
    result.appendChild(message);
    modal.style.display = "flex";
    modal.style.animation = "modalOn 1s forwards";
}

btnCloseModal.addEventListener("click", () => {
    result.removeChild(result.firstElementChild);
    modal.style.display = "none";
    modal.style.animation = "mmodalOff 1s forwards";
})