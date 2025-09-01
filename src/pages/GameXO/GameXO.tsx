import type React from "react";

import styles from "./GameXO.module.scss";
import { useEffect, useState } from "react";

type fildItemType = {
    id: number,
    state: string | null
}

const fildItems: fildItemType[] = [
    { id: 0, state: null },
    { id: 1, state: null },
    { id: 2, state: null },
    { id: 3, state: null },
    { id: 4, state: null },
    { id: 5, state: null },
    { id: 6, state: null },
    { id: 7, state: null },
    { id: 8, state: null },
];

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

function checkResults(comb: number[]) {
    let result = false;
    combinations.map(resItem => {
        if (resItem.every(item => comb.includes(item))) return result = true;
    })
    return result;
};

// type playersType = {
//     id: number,
//     name: string,
//     win: boolean,
//     result: number[]
// }

// const playersData: playersType[] = [
//     {
//         id: 0,
//         name: "X",
//         win: false,
//         result: []
//     },
//     {
//         id: 1,
//         name: "O",
//         win: false,
//         result: []
//     }
// ]

const GameXO: React.FC = () => {
    const [fild, setFild] = useState(fildItems);
    const [player, setPlayer] = useState(false); // false - X; true - 0
    const [resultsX, setResultsX] = useState<number[]>([]);
    const [resultsO, setResultsO] = useState<number[]>([]);

    // const [players, setPlayers] = useState<playersType[]>(playersData); // TODO
    const [winerX, setWinerX] = useState(false);
    const [winerO, setWinerO] = useState(false);


    const handleClick = (id: number) => {
        setPlayer(!player);

        const copyFild: fildItemType[] = fild.map(item => item);
        copyFild.map((item: fildItemType) => {
            if (item.id === id) {
                player ? item.state = "O" : item.state = "X"

                if (player) {
                    const res: number[] = resultsO;
                    res.push(item.id);
                    setResultsO(res);
                }
                else {
                    const res: number[] = resultsX;
                    res.push(item.id);
                    setResultsX(res);
                }
            };
        });
        setFild(copyFild);
    }

    const cleanFild = () => {
        const copyFild = fild.map(i => i);
        copyFild.map((item) => {
            item.state = null;
        })
        setFild(copyFild);
        setPlayer(false);
        setResultsX([]);
        setResultsO([]);
        setWinerX(false);
        setWinerO(false);
    }

    useEffect(() => {
        console.log(checkResults(resultsX));
        console.log(checkResults(resultsO));
        if (checkResults(resultsX)) setWinerX(true);
        if (checkResults(resultsO)) setWinerO(true);
    }, [fild]);

    const viewPlayers = (
        <>

            <p className={styles.game__turn}>Ход игрока</p>
            <div className={styles.game__players}>
                <p className={player ? styles.game__players_name : styles.game__players_name_lead}>Игрок X</p>
                <p className={player ? styles.game__players_name_lead : styles.game__players_name}>Игрок O</p>
            </div>
        </>);

    return (<div className={styles.game}>
        <h2 className={styles.game__title}>Крестики нолики</h2>

        <div className={styles.game__viewPlayers}>
            {(!winerX && !winerO) && viewPlayers}

            {winerX && <p className={styles.game__players_name}>Победил игрок X</p>}
            {winerO && <p className={styles.game__players_name}>Победил игрок O</p>}
        </div>


        <div className={styles.game__fild}>
            {fild.map(item =>
                <button
                    key={item.id}
                    className={styles.game__fild_button}
                    onClick={() => {
                        if (!item.state) { handleClick(item.id) }
                    }}
                    disabled={(winerX || winerO) ? true : false}
                >
                    {item.state}
                </button>)}
        </div>

        <button
            className={styles.game__clean}
            onClick={() => { cleanFild(); }}
        >Начать заново</button>
    </div >);
};

export default GameXO;