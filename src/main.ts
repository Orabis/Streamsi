import './style.css'
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    reconnectionDelayMax: 10000,
});

async function postData(formData: FormData) {
    const url = "http://localhost:3000/videos-upload"
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const result = await response.json()
        socket.emit("message", "New video !")
        console.log(result)
    } catch (error:any) {
        console.error(error.message)
    }
}
const formTest = document.getElementById("form") as HTMLFormElement;

formTest.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formTest)
    await postData(formData)


})
