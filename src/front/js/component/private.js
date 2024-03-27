import React, { useContext, useState, useEffect } from "react";

export const Private = () => {

    const [currentEmail, setCurrentEmail] = useState("");


    useEffect(() => {
        fetch(`https://verbose-lamp-jj565g97vvx6cp4pr-3001.app.github.dev/api/protected`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("token") // ⬅⬅⬅ authorization token
            }
        })
            .then(resp => resp.json())
            .then(data => setCurrentEmail(data.email))
    }, [])



    return (
        <div className="text-center mt-5">
            <h3>
                This is the private Component
                <br />
                User logged in as: {currentEmail ? currentEmail : "None"}
            </h3>
        </div>
    )

}







