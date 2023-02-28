import React, { useEffect, useRef, useState } from "react";
import "./Game.css";

const Game = ({ socket, username, room }) => {
  const [timer, setTimer] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showRandomNumbers, setShowRandomNumbers] = useState(false);
  let count = 0;
  // const [matrix, setMatrix] = useState([]);
  const [alphabetList, setAlphabetList] = useState([[], [], [], [], []]);
  const [math, setMath] = useState([[], [], [], [], []]);
  useEffect(() => {
    console.log(socket);
    socket.on("generate_game", (matrix) => {
      setMath((list) => [...list, ...matrix]);
      // setMath(matrix);
      console.log(math);
      console.log("여기입니다", matrix);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function shuffleMatrix(matrix) {
    matrix.sort(() => Math.random() - 0.5);
    return matrix;
  }

  const generateRandomMatrix = () => {
    const matrix = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "-",
      "+",
      "*",
      "/",
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "-",
      "+",
      "*",
      "/",
    ];
    shuffleMatrix(matrix);
    const a = matrix.splice(0, 5);
    const b = matrix.splice(0, 5);
    const c = matrix.splice(0, 5);
    const d = matrix.splice(0, 5);
    const e = matrix.splice(0, 5);

    const newMath = [[...a], [...b], [...c], [...d], [...e]];
    // setMath(newMath);
    socket.emit("generate_game", room, newMath);
    // setShowRandomNumbers(true);
    // generateRandomAlphabet();
    // setShowButton(false);

    // const intervalId = setInterval(() => {
    //   count++;
    //   if (count === 10) {
    //     clearInterval(intervalId);
    //     setTimer(false);
    //   }
    //   console.log(count);
    // }, 1000);
  };

  function generateRandomAlphabet() {
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    shuffleMatrix(alphabet);
    const f = alphabet.splice(0, 5);
    const g = alphabet.splice(0, 5);
    const h = alphabet.splice(0, 5);
    const i = alphabet.splice(0, 5);
    const j = alphabet.splice(0, 5);

    const newAlphabet = [[...f], [...g], [...h], [...i], [...j]];

    socket.emit("generate_game", room, newAlphabet);

    socket.on("get_1game", (game) => {
      setAlphabetList(game);
      console.log("zzzzzzzzzzzzzzzz", game);
    });
  }

  // TODO: Add a function to show rules (onClick)
  return (
    <>
      <div className="container">
        {showRandomNumbers && timer ? (
          <table className="table-container">
            <tbody>
              {math.map((item, index) => (
                <tr key={`math_${index}`}>
                  {item.map((item, index) => (
                    <td key={`math_item_${index}`}>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <button onClick={generateRandomMatrix}>generate game</button>
          </table>
        ) : (
          <table className="table-container">
            <tbody>
              {alphabetList.map((item, index) => (
                <tr key={`alphabet_${index}`}>
                  {item.map((item, index) => (
                    <td key={`item-${index}`}>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <button onClick={generateRandomMatrix}>generate game</button>
          </table>
        )}
        {/* {showButton && (
          <button onClick={generateRandomMatrix}>generate game</button>
        )} */}
      </div>
    </>
  );
};

export default Game;