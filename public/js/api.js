class Api{
    constructor(){
        this.host = "192.168.1.113:3001";
        
    }
    async signin(body) {
        body = new URLSearchParams(body).toString();
        const query = await fetch(`http://${this.host}/api/auth/signin`,
        {
            method: "POST",
            body: body,
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        );
        return await query.json();
    }
    async startGame() {
        const query = await fetch(`http://${this.host}/api/game/start`);
        return await query.json();
    }
    async joinGame() {
        const query = await fetch(`http://${this.host}/api/game/join`);
        return await query.json();
    }
    async launchDice(score, userId) {
        const bearerToken = this.getCookies().access_token;
        const body = {
            userId: userId,
            score: score
        }
        return await fetch('http://192.168.1.113:3001/api/game/dice/', { 
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "Authorization": `bearer ${bearerToken}`,
            },
            body: JSON.stringify(body)
        })
    }
    // Methods here
    getCookies(){
        const cookies = document.cookie.split("; ");
        const cookiesLines = cookies.map(function(cookie, index) {
            const cookieKeyValue = cookie.split('=');
            const cookieKey = cookieKeyValue[0];
            const cookieValue = cookieKeyValue[1];
            const cookieLine = `"${cookieKey}": "${cookieValue}"`;
            return cookieLine;
        })
        return JSON.parse(`{${cookiesLines.join(",\r\n")}}`);
    }
}

const API = new Api();


let _userId = null;

function setUserId(id){
	console.log(id)
	_userId = id;
}

// async function signup(body){

// 	return await fetch('http://192.168.1.113:3001/api/auth/signup', 
// 		{
// 			method: "POST",
// 			credentials: "include",
// 			body: JSON.stringify(body),
// 			headers: {                           
//   				"Content-Type": "application/json"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	
// async function signin(body){

// 	const query =  await fetch('http://192.168.1.113:3001/api/auth/signin', 
// 	{
// 		method: "POST",
// 			body: JSON.stringify(body),
// 			headers: {                           
//   				"Content-Type": "application/json"    
// 			} 		
// 		}
// 	)
// 	return await query.json();
	

// };

// 

// };
// async function getOnePost(id){

// 	return await fetch(`http://192.168.1.113:3001/api/posts/${id}`, {credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());

// };


// async function deleteOnePost(id){

// 	return await fetch(`http://192.168.1.113:3001/api/posts/${id}`, {method: "DELETE", credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());

// };


// export async function getOthers(){

// 	return await fetch('http://192.168.1.113:3001/api/others', {credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function getCommentByPostId(id){

// 	return await fetch(`http://192.168.1.113:3001/api/comments/${id}`, {credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function killMe(){

// 	return await fetch('http://192.168.1.113:3001/api/auth/killMe', {method: "DELETE", credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function signout(){

// 	return await fetch('http://192.168.1.113:3001/api/auth/signout', {credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function getProfil(){
// 	return await fetch('http://192.168.1.113:3001/api/auth/profil', {credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function sendComment(body){

// 	return await fetch('http://localhost:3001/api/comments', 
// 		{
// 			method: "POST",
// 			body: JSON.stringify(body),

// 			headers: {                           
//   				"Content-Type": "application/json"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function updateOneComment(body, id){

// 	return await fetch(`http://localhost:3001/api/comments/${id}`, 
// 		{
// 			method: "PUT",
// 			body: JSON.stringify({text: body}),

// 			headers: {                           
//   				"Content-Type": "application/json"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function setProfil(body){

// 	return await fetch('http://localhost:3001/api/auth/profil', 
// 		{
// 			method: "PUT",
// 			body: body,

// 			headers: {                           
//   				"x-Content-Type": "multipart/form-data"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function postOne(body){
// 	return await fetch('http://localhost:3001/api/posts', 
// 		{
// 			method: "post",
// 			body: body,

// 			headers: {                           
//   				"x-Content-Type": "multipart/form-data"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function updateOnePost(body, id){

// 	return await fetch(`http://localhost:3001/api/posts/${id}`, 
// 		{
// 			method: "PUT",
// 			body: body,

// 			headers: {                           
//   				"x-Content-Type": "multipart/form-data"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function likePost(like, id){

// 	return await fetch(`http://localhost:3001/api/posts/like/${id}`, 
// 		{
// 			method: "POST",
// 			body: JSON.stringify({ like }),

// 			headers: {                           
//   				"Content-Type": "application/json"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	

// };

// export async function likeComment(like, id){

// 	return await fetch(`http://localhost:3001/api/comments/like/${id}`, 
// 		{
// 			method: "POST",
// 			body: JSON.stringify({ like }),

// 			headers: {                           
//   				"Content-Type": "application/json"    
//  			} 		
//  		}
// 	)
// 	.then(handleErrors).then(res => res.json());
	

// };

// async function deleteComment(id){

// 	return await fetch(`http://localhost:3001/api/comments/${id}`, {method: "DELETE", credentials: 'include'})
// 	.then(handleErrors).then(res => res.json());

// };


// const handleErrors = response => {

// 	if(!response.ok)
// 	{
// 		throw Error(response.statusText);
// 	}
// 	return response;
// };