
const usersContainer = document.getElementById('users-container');

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(users => {
        users.forEach(user => {
            const userBlock = document.createElement('div');
            userBlock.className = 'user-block';

            const userInfo = document.createElement('p');
            userInfo.innerHTML = `<b>ID:</b> ${user.id} <br> <b>Name:</b> ${user.name}`;

            const detailsLink = document.createElement('a');
            detailsLink.innerText = 'user details';

            detailsLink.href = `../user_details/user_details.html?id=${user.id}`;

            userBlock.appendChild(userInfo);
            userBlock.appendChild(detailsLink);

            usersContainer.appendChild(userBlock);
        });
    })
    .catch(error => {

        console.error('Data loading error:', error);
        usersContainer.innerText = 'Data loading error. Please try refreshing the page.';
    });