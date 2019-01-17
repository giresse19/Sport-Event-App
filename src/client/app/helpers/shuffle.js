/* helper function for shuffling array */
import shuffleDB from './data/runners';

function shuffle(array = shuffleDB) {
  let currentIndex = array.length /* eslint-disable one-var */,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    /* eslint-disable yoda */
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    // eslint-disable-line no-param-reassign
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default shuffle;
