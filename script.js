let musics = [
    {
        name :"slow dancing in the dark",
        cover :"images/slow dancing in the dark.webp",
        audio : new Audio("./songs/Joji - SLOW DANCING IN THE DARK.mp3")
    },
    {
        name :"Glimpse of Us",
        cover :"images/glimpse-of-us.webp",
        audio : new Audio("./songs/Joji_-_Glimpse_of_Us.mp3")
    },
    {
        name :"EW",
        cover :"images/Ew-by-joji.webp",
        audio : new Audio("./songs/01. Ew.mp3")
    }
]

let musicName = document.querySelector("#music-name");
let musicCover = document.querySelector("#music-cover");
let playBtn = document.querySelector("#play-btn");
let nextBtn = document.querySelector("#next-btn");
let backBtn = document.querySelector("#back-btn");
let range = document.querySelector("#music-time");

let currentMusic = 0;

let audio = musics[currentMusic].audio;
musicCover.src = musics[currentMusic].cover;
musicName.innerText = musics[currentMusic].name;

//audio.duration return time of your music
//canplay one event to return you can play audio or not
audio.addEventListener("canplay",(e)=>{
    range.max = audio.duration
})

//currenttime return where is the your audio 
audio.addEventListener("timeupdate",()=>{
    range.value = audio.currentTime;
    document.querySelector("#abc").innerText = audio.currentTime;
})


audio.addEventListener("ended",()=>{
    changemusic("next")
    audio.play()
    playBtn.classList.replace("fa-play","fa-pause")
   
})

range.addEventListener("input",()=>{
    audio.currentTime = range.value
})

playBtn.addEventListener("click",()=>{
    if(audio.paused){
        audio.play();
        musicCover.style.animationPlayState = "running"
        playBtn.classList.replace("fa-play","fa-pause")

    }else{
        audio.pause();
        musicCover.style.animationPlayState = "paused"
        playBtn.classList.replace("fa-pause","fa-play")
    }
})

nextBtn.addEventListener("click",()=>{
    changemusic("next");
})

backBtn.addEventListener("click",()=>{
    changemusic("back");
})


function changemusic(state){
    
    audio.pause();
    musicCover.style.animationPlayState = "paused"
    playBtn.classList.replace("fa-pause","fa-play")
    range.value = 0
    audio.currentTime = 0
    audio.currentMusic = 0
    if (state == "next"){
        if (currentMusic == musics.length -1)
            currentMusic = 0
            else
            currentMusic += 1

    }else{
        if (currentMusic == 0){
            currentMusic = musics.length -1 
        }else{
            currentMusic -= 1
        }
    }
    audio = musics[currentMusic].audio;
    musicCover.src = musics[currentMusic].cover;
    musicName.innerText = musics[currentMusic].name;
    audio.addEventListener("timeupdate",()=>{
        range.value = audio.currentTime
    })
    audio.addEventListener("canplay",()=>{
        range.max = audio.duration
    })
}


