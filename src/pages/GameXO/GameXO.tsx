import type React from "react";

import styles from "./GameXO.module.scss";
import { useState } from "react";

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

const GameXO: React.FC = () => {
    const [fild, setFild] = useState(fildItems);
    const [player, setPlayer] = useState(false); // false - X; true - 0

    const handleClick = (id: number) => {
        console.log('click', id);

        setPlayer(!player);
        console.log('Походил игрок:', player)

        const copyFild = fild.map(item => item);
        copyFild.map((item) => {
            if (item.id === id) { player ? item.state = "O" : item.state = "X" };
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
    }

    return (<div className={styles.game}>
        <h2 className={styles.game__title}>Крестики нолики</h2>

        <p className={styles.game__turn}>Ход игрока</p>
        <div className={styles.game__players}>
            <p className={player ? styles.game__players_name : styles.game__players_name_lead}>Игрок X</p>
            <p className={player ? styles.game__players_name_lead : styles.game__players_name}>Игрок O</p>
        </div>

        <div className={styles.game__fild}>
            {fild.map(item =>
                <button
                    key={item.id}
                    className={styles.game__fild_button}
                    onClick={() => {
                        if (!item.state) { handleClick(item.id) }
                        else { console.log('Поле занято!') }
                    }}
                >
                    {item.state}
                </button>)}
        </div>

        <button
            className={styles.game__clean}
            onClick={() => { cleanFild(); }}
        >Начать заново</button>
    </div>);
};

export default GameXO;