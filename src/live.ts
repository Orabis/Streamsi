import './style.css'
import { socket } from './services.ts'

const app = document.getElementById("app") as HTMLDivElement

async function getVideo(name: string) {
    const url = "http://localhost:3000/videos/" + name;
    try {
        const videoElement = document.createElement("video");
        videoElement.src = url;
        videoElement.autoplay = true;
        videoElement.muted = true; //TODO : Ne pas oublier de retirer en prod

        app.appendChild(videoElement);
        await videoElement.play();

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erreur lors de la lecture :", error.message);
        }
    }
}

socket.on("sendChat", async (data) => {
    console.log("Chat reçu")
    await getVideo(data.videoName)
})
