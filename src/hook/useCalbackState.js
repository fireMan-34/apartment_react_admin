import { useState, useRef, useEffect } from "react";
const useCallbackState = (state) => {
    const [data, setData] = useState(state);
    const cbRef = useRef();
    useEffect(() => {
        cbRef.current && cbRef.current(data);
    }, [state]);
    return [data, (val, callback) => {
        cbRef.current = callback;
        setData(val);
    }]
};
export default useCallbackState;