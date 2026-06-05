const API =
'https://your-api-url.com/api';

const token =
localStorage.getItem('token');

const authHeaders = () => ({
'Content-Type':'application/json',
Authorization:`Bearer ${token}`
});

/*
LOGIN
*/

const loginForm =
document.getElementById('loginForm');

if(loginForm){

loginForm.addEventListener(
'submit',
async e => {

e.preventDefault();

const email =
document.getElementById('email').value;

const password =
document.getElementById('password').value;

const res = await fetch(
`${API}/auth/login`,
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
email,
password
})
}
);

const data =
await res.json();

if(data.token){

localStorage.setItem(
'token',
data.token
);

window.location =
'profile.html';

}

});
}

/*
SIGNUP
*/

const signupForm =
document.getElementById('signupForm');

if(signupForm){

signupForm.addEventListener(
'submit',
async e => {

e.preventDefault();

const body = {
first_name:
document.getElementById(
'first_name'
).value,

last_name:
document.getElementById(
'last_name'
).value,

username:
document.getElementById(
'username'
).value,

email:
document.getElementById(
'email'
).value,

password:
document.getElementById(
'password'
).value
};

await fetch(
`${API}/auth/register`,
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify(body)
}
);

window.location =
'login.html';

});
}

/*
CREATE POST
*/

const postForm =
document.getElementById(
'postForm'
);

if(postForm){

postForm.addEventListener(
'submit',
async e => {

e.preventDefault();

await fetch(
`${API}/posts`,
{
method:'POST',
headers:authHeaders(),
body:JSON.stringify({
title:
document.getElementById(
'title'
).value,

content:
document.getElementById(
'content'
).value,

tags:
document.getElementById(
'tags'
)
.value
.split(',')
})
}
);

alert('Draft Created');

});
}

/*
PUBLIC FEED
*/

const feed =
document.getElementById('feed');

if(feed){

fetch(
`${API}/posts`
)
.then(r=>r.json())
.then(data=>{

feed.innerHTML =
data.posts
.map(post=>`
<div class="post-card">

<h3>${post.title}</h3>

<div class="post-meta">
${post.author?.username}
</div>

<p>
${post.content}
</p>

</div>
`)
.join('');

});

}

/*
PROFILE POSTS
*/

const myPosts =
document.getElementById(
'myPosts'
);

if(myPosts && token){

fetch(
`${API}/users/me/posts`,
{
headers:authHeaders()
}
)
.then(r=>r.json())
.then(data=>{

document.getElementById(
'postsCount'
).innerText =
data.posts.length;

myPosts.innerHTML =
data.posts.map(post=>`

<div class="post-card">

<h3>${post.title}</h3>

<p>${post.content}</p>

<p>
Status:
${post.state}
</p>

</div>

`).join('');

});

}