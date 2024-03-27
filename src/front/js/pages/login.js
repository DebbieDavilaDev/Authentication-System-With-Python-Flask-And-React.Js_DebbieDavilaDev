import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/flamingofamily.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const handleClick = () => {

		const opts = {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"email": email,
				"password": password
			})

		}
		fetch("https://verbose-lamp-jj565g97vvx6cp4pr-3001.app.github.dev/api/token", opts)
			.then(resp => {
				if (resp.ok) return resp.json();
				else alert("THERE HAS BEEN SOME ERROR!");

			})
			.then(resp => {
				sessionStorage.setItem("token", resp.access_token);

				console.log("sessionSTORAGE")
				console.log(sessionStorage)
			})
			.catch(error => {
				console.error("THERE WAS AN ERROR!!!!!!", error)
					.then(resp => resp.json())
					.then(data => console.log("Success!!", data))
			})
	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<h1>Hello Debbie!!</h1>
			<div> 
				<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button onClick={handleClick}> Login</button>
			</div>
		</div>
	);
};
