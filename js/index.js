const searchForm = document.querySelector("#github-form")
const userList = document.querySelector("#user-list");
const repoList = document.querySelector("#repos-list");

searchForm.addEventListener("submit", function(event){
    event.preventDefault();
    userList.innerHTML = "";
    repoList.innerHTML = "";
    let search = document.querySelector("#search");
    fetchSearch(search.value);
})

function fetchSearch(value) {
    return fetch(`https://api.github.com/search/users?q=${value}`, {
        header: {Accept: "application/vnd.github.v3+json" }
    })
        .then(function(resp){
            return resp.json();
        })
        .then(function(user){
            user.items.forEach(renderUser);
        })
}

function renderUser(user) {
    let oneUser = `
        <li id=${user.id}>
            <h3>${user.login}</h3><br />
            <img src="${user.avatar_url}"><br />
            <a href="${user.html_url}" target="_blank">Profile Link</a><br />
        </li>`;
    userList.innerHTML += oneUser;
    searchForm.reset();
}

userList.addEventListener("click", function(event){
    let user = event.target.closest("li");
    let username = user.querySelector("h3").innerText;
    fetchUser(username);
})

function fetchUser(username) {
    return fetch(`https://api.github.com/users/${username}/repos`, {
        header: {Accept: "application/vnd.github.v3+json" }
    })
        .then(function(resp){
            return resp.json();
        })
        .then(function(repos){
            repoList.innerHTML = "";
            repos.forEach(renderRepos)
        })
}

function renderRepos(repo){
    let oneRepo = `
        <li id=${repo.id}>
        <h2>${repo.name}</h2>
        </li>
    `
    repoList.innerHTML += oneRepo
}