import { updateState } from "pages/NestedCheckbox/assets/update";
import type { ViewData } from "pages/NestedCheckbox/assets/listData";
import { useState } from "react";
import List from 'pages/NestedCheckbox/components/List'

export type ListProps = {
    data?: ViewData;
};

const TreeView: React.FC<ListProps> = ({ data }) => {
    const [stateData, setStateData] = useState<ViewData>(data || []);
    console.log(stateData);

    const handleChange = (id: number, state: boolean) => {
        const updatedData = updateState(stateData, id, state);
        setStateData(updatedData);
    };

    return <List data={stateData} onChange={handleChange} />;
};

export default TreeView;