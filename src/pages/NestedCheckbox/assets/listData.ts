import { dataTest, type ListData } from "pages/NestedCheckbox/assets/mocData";


export type ViewList = {
    id: number;
    label: string;
    state: boolean | null;
    children?: ViewList[];
};

export type ViewData = ViewList[];

function addState(data: ListData): ViewData {
    return data.map((item) => ({
        id: item.id,
        label: item.label,
        state: false,
        children: item.children ? addState(item.children) : undefined,
    }));
}

export const viewData: ViewData = addState(dataTest);
