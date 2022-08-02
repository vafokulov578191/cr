let url = 'http://localhost:3001/users'
let data = []

function react() {
    axios.get(url)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                data = res.data
                reload(data)
                let arr = res.data
                Lenght.innerHTML = arr.length
            }
        })
        .catch(err => console.log(err))
}
react()

let Lenght = document.querySelector('.Lenght')
let count = document.querySelector('.main_block')
let inp_search = document.querySelector('.inp_search')
let form = document.forms.user


form.onsubmit = (e) => {
    e.preventDefault()

    let user = {
        id: Math.random(),
        Premiya: false
    }

    let fm = new FormData(form)
    fm.forEach((value, key) => {
        user[key] = value
    })

    PostItem(user)
}

inp_search.onkeyup = () => {
    let find = data.filter(item => item.Name.toLowerCase().includes(inp_search.value.toLowerCase()))
    reload(find)
}


let all_user = document.querySelector('.all_user')
let povish = document.querySelector('.povish')
let bolshe = document.querySelector('.bolshe')

all_user.onclick = () => {
    reload(data)
}

bolshe.onclick = () => {
    bolsher()
}

function bolsher() {
    let bokshe_user = []
    axios.get(url)
        .then(res => {
            res.data.filter(item => {
                if (item.Balance > 1000) {
                    bokshe_user.push(item)
                    reload(bokshe_user)
                }
            })
        })
}

let pre_lgn = []


function reload(arr) {
    count.innerHTML = ""
    for (let item of arr) {
        count.innerHTML += `
        <div className="item_counatiner" id="${item.id}" data-on="${item.Premiya}">
        <div class="item_block">
        <div class="item_left">
            <div class="Name">${item.Name}</div>
        </div>
        <div class="item_right">
            <div class="item_right_left">
                <div class="balance">${item.Balance}$</div>
            </div>
            <div class="item_right_right">
                <button>Pechenka</button>
                <button class="del">Delete</button>
                <input class="povisheniye" type="checkbox">
            </div>
            </div>
        </div>
        <div class="list"></div>
        </div>
        `

        let del = document.querySelectorAll('.del')
        del.forEach((dele) => {
            dele.onclick = (event) => {
                let id = event.target.parentNode.parentNode.parentNode.parentNode.id
                Delete_item(id)
            }
        })

        let povisheniye = document.querySelectorAll('.povisheniye')
        povisheniye.forEach(inp => {
            if (inp.parentNode.parentNode.parentNode.parentNode.getAttribute('data-on') === 'true') {
                inp.checked = 'checked'
            }
            inp.onclick = (e) => {
                let id = e.target.parentNode.parentNode.parentNode.parentNode.id
                let test = item.Premiya = !item.Premiya
                axios.patch(`${url}/${id}`, {
                        Premiya: test
                    })
                    .then(res => console.log(res))
            }
        })


        let lenght_prem = document.querySelector('.lenght_prem')

        if(item.Premiya === true) {
            pre_lgn.push(item)
            lenght_prem.innerHTML = pre_lgn.length
        }
    }
}



function PostItem(post) {
    axios.post(url, post)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                res.data
                react()
            }
        })
}


function Delete_item(id) {
    axios.delete(`${url}/${id}`)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                res.data
                react()
            }
        })
}

