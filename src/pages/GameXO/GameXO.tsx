import type React from "react";

import styles from "./GameXO.module.scss";
import { useReducer, useState } from "react";

type FildItemType = {
    id: number,
    state: string | null
}

const FildItems: FildItemType[] = [
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

type PlayersType = {
    id: number,
    name: string,
    active: boolean,
    win: boolean,
    result: number[]
}

const PlayersData: PlayersType[] = [
    {
        id: 0,
        name: "X",
        active: true,
        win: false,
        result: []
    },
    {
        id: 1,
        name: "O",
        active: false,
        win: false,
        result: []
    }
]

const FORM_ACTIONS = {
    setActive: "SetActive",
    setWin: "setWin",
    setResult: "setResult",
    setClean: "setClean"
}

type PayloadTypes = {
    name?: string,
    result?: number
}

type Action = {
    type: string;
    payload: PayloadTypes
};

function gameReducer(state: PlayersType[], action: Action) {
    switch (action.type) {
        case FORM_ACTIONS.setActive:
            return state.map(player => ({
                ...player,
                active: !player.active
            }))

        case FORM_ACTIONS.setResult:
            return state.map(player => ({
                ...player,
                result: action.payload.name === player.name ? ((action.payload.result !== undefined && action.payload.result !== null)
                    ? [...player.result, action.payload.result]
                    : player.result) : player.result
            }))

        case FORM_ACTIONS.setWin:
            return state.map(player => ({
                ...player,
                win: (action.payload.name === player.name) ? true : player.win
            }))

        case FORM_ACTIONS.setClean:
            return PlayersData

        default: return state;
    }
};

const GameXO: React.FC = () => {
    const [fild, setFild] = useState(FildItems);
    const [gameState, gameDispatch] = useReducer(gameReducer, PlayersData);
    const [finish, setFinish] = useState(false);
    const [moves, setMoves] = useState(0);

    const handleClick = (id: number) => {
        gameDispatch({ type: FORM_ACTIONS.setActive, payload: {} })

        const copyFild: FildItemType[] = [...fild];
        copyFild.map((item: FildItemType) => {
            if (item.id === id) {
                gameState.map(player => {
                    player.active ? item.state = player.name : ''

                    player.active && gameDispatch({ type: FORM_ACTIONS.setResult, payload: { name: player.name, result: item.id } })
                })
            };
        });
        setFild(copyFild);
        setMoves(moves + 1);
    }

    const cleanFild = () => {
        const copyFild = fild.map(i => i);
        copyFild.map((item) => {
            item.state = null;
        })
        setFild(copyFild);
        setMoves(0);
        setFinish(false)

        gameDispatch({ type: FORM_ACTIONS.setClean, payload: {} })
    }

    gameState.map(player => {
        if (checkResults(player.result) && !finish) {
            gameDispatch({ type: FORM_ACTIONS.setWin, payload: { name: player.name } })
            setFinish(true);

        }
    })

    const viewPlayers = (
        <>
            <p className={styles.game__turn}>Ход игрока</p>
            <div className={styles.game__players}>
                {gameState.map(player =>
                    <p key={player.id} className={player.active ? styles.game__players_name_lead : styles.game__players_name}>Игрок {player.name}</p>
                )}
            </div>
        </>);

    return (<div className={styles.game}>
        <h2 className={styles.game__title}>Крестики нолики</h2>

        <div className={styles.game__viewPlayers}>
            {(!finish && !(moves === fild.length)) && viewPlayers}

            {gameState.map(player =>
                player.win && <p key={player.id} className={styles.game__players_name}>Победил игрок {player.name}</p>
            )}

            {((moves === fild.length) && !finish) && <p className={styles.game__players_name}>Ничья!</p>}
        </div>


        <div className={styles.game__fild}>
            {fild.map(item =>
                <button
                    key={item.id}
                    className={styles.game__fild_button}
                    onClick={() => {
                        if (!item.state) { handleClick(item.id) }
                    }}
                    disabled={finish ? true : false}
                >
                    {item.state}
                </button>)}
        </div>

        <button
            className={styles.game__clean}
            onClick={cleanFild}
        >Начать заново</button>
    </div >);
};

export default GameXO;