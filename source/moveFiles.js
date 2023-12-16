import fs from "fs";
import songList from "./src/assets/songList.json" with {type: "json"};

export const copyFiles = () => {
    fs.mkdirSync("src/assets/lyrics");
  songList.map((song) => {
    fs.mkdirSync("src/assets/lyrics/" + song.category);
    song.song.map((songName) => {
      fs.copyFileSync(
        "../lyrics/" + song.category + "/" + songName + ".txt",
        "src/assets/lyrics/" + song.category + "/" + songName + ".md"
      );
    });
  });
};

copyFiles()
