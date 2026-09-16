import { socket } from './services.ts'

const app = document.getElementById("app") as HTMLDivElement

interface Video {
    videoName: string,
    text: string
}

async function getVideo(video: Video) {
    try {
        const baseUrl = "http://localhost:3000/videos/" + video.videoName
        const response = await fetch(baseUrl, {
            method: "GET",
        })
        if (!response.ok) {
            return
        }
        const result = await response.json()
        const url = result.url
        await handleVideo(url, video.text)

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erreur lors du fetch :", error.message)
        }
    }
}

async function handleVideo(url: string, videoText: string) {
    const videoElement = document.createElement("video")
    const text = document.createElement("h1")

    videoElement.src = url
    videoElement.autoplay = true
    videoElement.classList.add("video")

    text.textContent = videoText
    text.classList.add("title")

    app.appendChild(videoElement)
    app.appendChild(text)
    await videoElement.play()

    videoElement.addEventListener("ended", () => {
        videoElement.remove()
        text.remove()
    }, {once: true})
}

socket.on("sendChat", async (data) => {
    console.log("Chat reçu", data.videoName, data.text)
    await getVideo(data)
})
