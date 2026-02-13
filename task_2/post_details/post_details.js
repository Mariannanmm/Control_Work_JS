const postDetailsContainer = document.getElementById('post-details-container');
const commentsContainer = document.getElementById('comments-container');
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

if (postId) {

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {

            let postHtml = '<div class="post-box"><h2>Post details</h2><ul>';
            for (const key in post) {
                postHtml += `<li><b>${key}:</b> ${post[key]}</li>`;
            }
            postHtml += '</ul></div>';
            postDetailsContainer.innerHTML = postHtml;


            return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        })
        .then(response => response.json())
        .then(comments => {
            let commentsHtml = '<div class="comments-section"><h2>Comments</h2>';

            if (comments.length > 0) {
                comments.forEach(comment => {
                    commentsHtml += `
                                <div class="comment-box">
                                    <p class="comment-meta">${comment.name}</p>
                                    <p class="comment-email">Email: ${comment.email}</p>
                                    <p>${comment.body}</p>
                                </div>
                            `;
                });
            } else {
                commentsHtml += '<p>No comments.</p>';
            }

            commentsHtml += '</div>';
            commentsContainer.innerHTML = commentsHtml;
        })
        .catch(error => {
            console.error('Error:', error);
            postDetailsContainer.innerHTML = '<p>Data loading error</p>';
        });
} else {
    postDetailsContainer.innerHTML = 'ID post not found URL.';
}