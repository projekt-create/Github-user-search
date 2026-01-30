// Git-hub User search API
const API_URL = 'https://api.github.com/users/';

// Dom
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// functions
async function getUser(username) {
    try {
        const { data } = await axios(API_URL + username);
        console.log(data);
        
        createUserCard(data);
    }catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username');
        }
    }
}

function createUserCard(user) {
    const cardHTML = `
        <div class="user-card">
            <img
            src="${user.avatar_url}"
            alt="User avatar"
            class="avatar"
            />

            <h2 class="username">${user.login}</h2>
            <a href=${user.html_url} target="_blank" class="profile-link">
            github.com/${user.login}
            </a>

            <div class="info">
            <div>
                <span>Repos</span>
                <strong>${user.public_repos}</strong>
            </div>
            <div>
                <span>Followers</span>
                <strong>${user.followers}</strong>
            </div>
            <div>
                <span>Following</span>
                <strong>${user.following}</strong>
            </div>
            </div>

            <p class="date">
            Joined: <strong>${user.created_at}</strong>
            </p>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="user-card">
            <h2>${msg}</h2>
        </div>
    `;

    main.innerHTML = cardHTML;
}


// Event
form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user);

        search.value = '';
    }
});