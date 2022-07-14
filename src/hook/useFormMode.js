import { useEffect, useReducer, useState } from "react";

const FORM_OPEN_MODE = {
    ADD: "ADD",
    EDITE: "EDIT",
}
const FORM_ACTION = {
    ADD_AND_OPEN: "ADD_AND_OPEN",
    EDIT_AND_OPEN: "EDIT_AND_OPEN",
    CLOSE: "CLOSE",
}
const initFormState = { isOpen: false, editMode: FORM_OPEN_MODE.ADD, formType: "" };
/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const formReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case FORM_ACTION.ADD_AND_OPEN:
            return { isOpen: true, editMode: FORM_OPEN_MODE.ADD, formType: action.formType };
        case FORM_ACTION.EDIT_AND_OPEN:
            return { isOpen: true, editMode: FORM_OPEN_MODE.EDITE, formType: action.formType };
        case FORM_ACTION.CLOSE:
            return { ...state, ...{ isOpen: false } };
        default: return state;
    }
}
/**
 * 
 * 
 * @returns {{
 * formState:{isOpen:boolean:editMode:"ADD"|"EDIT",formType:string},
 * closeForm:()=>action
 * addAndOpenForm:(formType)=>action
 * editAndOpenForm:(formType)=>action,
 * formRef:{isOpen:boolean:editMode:"ADD"|"EDIT",formType:string,...}
 * }}
 */
const useFormMode = (callback = formState => { }) => {
    const [formState, disPatchFormState] = useReducer(formReducer, initFormState);
    const [cbState, setState] = useState(formState);
    useEffect(() => {
        setState({
            ...formState,
            ...callback(formState),
        });
    }, [formState]);
    return {
        formState,
        closeForm: () => disPatchFormState({ type: FORM_ACTION.CLOSE }),
        addAndOpenForm: (formType) => disPatchFormState({ type: FORM_ACTION.ADD_AND_OPEN, formType }),
        editAndOpenForm: (formType) => disPatchFormState({ type: FORM_ACTION.EDIT_AND_OPEN, formType }),
        formRef: cbState,

    }
};
export { useFormMode, FORM_OPEN_MODE };