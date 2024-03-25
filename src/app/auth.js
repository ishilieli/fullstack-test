/** STYLES **/
import '../style/common.scss'
import '../style/article.scss'

const setCookie = (name, value, days = 7, path = '/') => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

const deleteCookie = (name, path) => {
    setCookie(name, '', -1, path)
}
async function postUserData() {
    let user = {
        login: document.querySelector('#login').value,
        password: document.querySelector('#password').value
    };

    let response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let res = await response.json();
    console.log(res);
    if (res.status === 'ok' && res.jwt_data.length) {
        setCookie('token', res.jwt_data);
    }
}

document.querySelector('.js-send').addEventListener('click',function (e) {
    e.preventDefault();
    postUserData().then(r => console.log(r));
});