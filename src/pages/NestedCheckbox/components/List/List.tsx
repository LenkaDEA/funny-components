import type { ViewData } from "pages/NestedCheckbox/assets/listData";
import styles from './List.module.scss'

export type PodListProps = {
    data?: ViewData;
    onChange: (id: number, state: boolean) => void;
    padding?: number;
};

const List: React.FC<PodListProps> = ({ data = [], onChange, padding = 0 }) => {
    return (
        <ul style={{ listStyleType: 'none', paddingLeft: padding }}>
            {data.map((item) => {
                return (
                    <li key={item.id}>
                        <input
                            className={item.state === null ? styles.indeterminate : undefined}
                            type="checkbox"
                            onChange={() => {
                                onChange(item.id, !item.state);
                            }}
                            checked={typeof item.state === 'boolean' ? item.state : true}
                        />

                        {item.label}
                        {
                            /*добавить проверкуу на допустимую вложенность*/
                            item.children && (
                                <List
                                    data={item.children}
                                    onChange={onChange}
                                    padding={padding + 15}
                                />
                            )
                        }
                    </li>
                );
            })}
        </ul>
    );
};

export default List;
