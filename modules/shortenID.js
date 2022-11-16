const lowerLetter = "abcdefghijklmnopqrstuvwxyz";
const upperLetter = lowerLetter.toUpperCase();
const numbers = "1234567890";
const randomList = lowerLetter.concat(upperLetter, numbers).split("");
// create five random numbers

function shortenID() {
  let shortenId = "";

  for (let i = 0; i < 5; i++) {
    shortenId += randomList[Math.floor(Math.random() * randomList.length)];
  }
  return shortenId;
}

module.exports = shortenID;
