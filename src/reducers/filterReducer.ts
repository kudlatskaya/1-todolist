import {FilterValuesType} from "../App";

export const FilterReducer = (state: FilterValuesType, action: ActionType): FilterValuesType => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return action.payload.value;
        default:
            return state;
    }
}

type ActionType = ChangeFilterACType

type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value,
        }
    } as const
}