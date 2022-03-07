let modalResult = document.querySelector('.modal-result'); 
const btnCloseModal = document.getElementById('btn-close');
let btnPostForm = document.querySelector('.btn-form-post');
let modalPost = document.querySelector('.modal-post');
let result = document.querySelector(".resultado");
const closePost = document.getElementById('close-post');



const post = async () => {
    let name, job, id;
    let newUser = {
        "name" : document.getElementById('name').value,
        "job" : document.getElementById('job').value
    };

    try {
        if(newUser.name != "" && newUser.job != "") {
            let request = await axios.post(`https://reqres.in/api/users`, newUser);
            name = request.data.name;
            job = request.data.job;
            id = request.data.id;
            let resultPost = messageToPost(name, job, id);
            openModal(resultPost);
        } else {
            alert("Por favor complete los campos correspondientes");
        }
    } catch (e) {
        const par = document.createElement('P');
        par.innerHTML = `<b>Se produjo un eror</b>`;
        openModal(par);
    }
}

document.getElementById("send-post").addEventListener("click", post);

const messageToPost = (name, job, id) => {
    const frag = document.createDocumentFragment();
    const nameP = document.createElement("P");
    nameP.innerHTML = `Name: <b>${name}</b>`;
    const jobP = document.createElement("P");
    jobP.innerHTML = `Job: <b>${job}</b>`;
    const idP = document.createElement("P");
    idP.innerHTML =  `Id: <b>${id}</b>`;
    const div = document.createElement("DIV");

    div.appendChild(nameP);
    div.appendChild(jobP);
    div.appendChild(idP);
    frag.appendChild(div);
    return frag;
}

const getById = async () => {
    let result, name, lastName, email;
    try {
        let id = parseInt(prompt("Please enter an id"));
        let info = await axios(`https://reqres.in/api/users/${id}`);
        name = info.data.data.first_name;
        lastName = info.data.data.last_name;
        email = info.data.data.email;
        result = messageById(name, lastName, email);
        openModal(result);        
    } catch (e) {
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
    modalResult.style.display = "flex";
    modalResult.style.animation = "modalOn 1s forwards";
}

btnCloseModal.addEventListener("click", () => {
    result.removeChild(result.firstElementChild);
    modalResult.style.display = "none";
    modalResult.style.animation = "mmodalOff 1s forwards";
})

closePost.addEventListener("click", () => {
    document.getElementById('name').value = "";
    document.getElementById('job').value = "";
    modalPost.style.display = "none";
    modalPost.style.animation = "mmodalOff 1s forwards";
})

document.getElementById("button-2").addEventListener("click", () => {
    modalPost.style.display = "flex";
    modalPost.style.animation = "modalOn 1s forwards";
})