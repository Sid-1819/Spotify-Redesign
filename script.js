async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  console.log(as);
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  //.split("/songs/")[1]
  return songs;
}
async function main() {
  let songs = await getSongs();
  console.log(songs);

  let songLI = document
    .querySelector(".songlist")
    .getElementsByTagName("li")[0];
  for (const song of songs) {
    songLI.innerHTML = songLI.innerHTML + `<li>${song.replace("%20", " ")}<li>`;
  }

  var audio = new Audio(songs[0]);
  document.body.addEventListener("mousemove", function () {
    audio.play();
  });

  audio.addEventListener("loadeddata", () => {
    var duration = audio.duration / 60;
    console.log(duration);
  });
  //   var x = document.getElementById(songs[0]).duration;
  //   console.log(x);
}
main();
