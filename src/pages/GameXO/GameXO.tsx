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

    const handleClick = (id: number) => {
        console.log('click', id);

        const copyFild = fild.map(item => item);
        copyFild.map((item) => {
            if (item.id === id) item.state = "Q";
        });

        setFild(copyFild);
    }

    return (<div className={styles.game}>
        <h2 className={styles.game__title}>Крестики нолики</h2>

        <p className={styles.game__turn}>Ход игрока</p>
        <div className={styles.game__players}>
            <p className={styles.game__players_name}>Игрок X</p>
            <p className={styles.game__players_name}>Игрок O</p>
        </div>

        <div className={styles.game__fild}>
            {fild.map(item =>
                <button
                    key={item.id}
                    className={styles.game__fild_button}
                    onClick={() => { handleClick(item.id) }}
                >
                    {item.state}
                </button>)}
        </div>
    </div>);
};

export default GameXO;