let key_localstorage = null;
let el_comment_parent = document.querySelector('.comment')

// method render commentar
const render = (storage) => {
    for(let i=0; i<storage.length; i++){
        if(storage[i].nama !== null && storage[i].komentar !== null){
            let list_comment = document.createElement('div');
            list_comment.classList.add("list-comment")
    
            let name = document.createElement("h1");
            name.innerText = storage[i].nama;
            list_comment.append(name);
    
            let comment_value = document.createElement("p");
            comment_value = storage[i].komentar;
            list_comment.append(comment_value);
    
            el_comment_parent.append(list_comment);
        }
    }
}

// method to show commentar and check is already or no
const comment = () => {
    let path = document.location.href;
    path = path.split("/");

    let index_path = path.length;

    let key = path[index_path-1];
        key = key.replace(".html","");
    
    key_localstorage = key;

    // check local storage
    let storage = localStorage.getItem(`${key}`)
        storage = JSON.parse(storage)
    if(storage == null){
        localStorage.setItem(key,JSON.stringify([{nama:null,komentar:null}]))
    }else{
        el_comment_parent.innerHTML = "";
        render(storage);
    }
}

// use method comment
comment();


// get commentar value
const getComment = (callback) => {
    let form = document.querySelector('form');
    form.addEventListener('submit',async function(e){
        e.preventDefault();
        
        const comment = {
            nama: this.nama.value,
            komentar: this.komentar.value
        }

        // write comment in local storage
        await writeComment(comment)
        
        await callback();
        
        this.nama.value = "";
        this.komentar.value = "";


    })
}

// use get comment
getComment(comment);


// method to write command in localstorage
const writeComment = (comment) => {
    let list_comment = localStorage.getItem(key_localstorage);
        list_comment = JSON.parse(list_comment);

    if(list_comment.length >=5){
        list_comment.pop();
    }

    list_comment.unshift(comment);

    localStorage.setItem(key_localstorage,JSON.stringify(list_comment));

    // show commentar
}