import type { ViewData } from "pages/NestedCheckbox/assets/listData";

export const updateStateChildren = (
    items: ViewData,
    state: boolean | null
): ViewData => {
    return items.map((item) => {
        if (item.children)
            return {
                ...item,
                state: state,
                children: updateStateChildren(item.children, state),
            };
        return { ...item, state: state };
    });
};

export const updateState = (
    items: ViewData,
    id: number,
    state: boolean | null
): ViewData => {
    const updatedItems = items.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                state: state,
                children: item.children
                    ? updateStateChildren(item.children, state)
                    : undefined,
            };
        }

        if (item.children) {
            return { ...item, children: updateState(item.children, id, state) };
        }

        return item;
    });

    return updateParentStates(updatedItems);
};

export const calculateParentState = (children: ViewData): boolean | null => {
    if (children.length === 0) return false;

    const selectedCount = children.filter(
        (child) => child.state || child.state === null
    ).length;
    const totalCount = children.length;

    if (selectedCount === 0) return false;
    if (selectedCount === totalCount) return true;
    return null;
};

export const updateParentStates = (items: ViewData): ViewData => {
    return items.map((item) => {
        if (item.children) {
            const updatedChildren = updateParentStates(item.children);

            return {
                ...item,
                state: calculateParentState(updatedChildren),
                children: updatedChildren,
            };
        }

        return item;
    });
};
