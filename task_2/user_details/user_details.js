const userDetailsContainer = document.getElementById('user-details-container');
const postsContainer = document.getElementById('posts-container');
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

function buildDetailsList(object) {
    let html = '<ul>';
    for (const key in object) {
        const value = object[key];
        html += '<li>';
        html += `<b>${key}:</b> `;
        if (typeof value === 'object' && value !== null) {

            html += buildDetailsList(value);
        } else {
            html += value;
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
}

if (userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {

            userDetailsContainer.innerHTML = `
                        <div class="details-box">
                            <h2>All info about ${user.name}</h2>
                            ${buildDetailsList(user)}
                            <button id="posts-button" class="action-button">User posts</button>
                        </div>
                    `;


            const postsButton = document.getElementById('posts-button');
            postsButton.addEventListener('click', () => {
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                    .then(res => res.json())
                    .then(posts => {
                        let postsHtml = `
                                    <div class="posts-box">
                                        <h3>User post ${user.name}</h3>
                                `;
                        posts.forEach(post => {
                            postsHtml += `
                                        <div class="post-item">
                                            <span>${post.title}</span>
                                            <a href="post_details.html?postId=${post.id}">post details</a>
                                        </div>
                                    `;
                        });
                        postsHtml += '</div>';
                        postsContainer.innerHTML = postsHtml;
                    });
            });
        })
        .catch(error => console.error('Download error', error));
}