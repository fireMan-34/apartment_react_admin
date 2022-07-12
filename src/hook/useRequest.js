import { useState, useCallback } from "react";

export default function useRequest(requestFn) {
    const [isLoading, setIsLoading] = useState(false);
    const request = useCallback(async function (config = {}) {
        try {
            setIsLoading(v => true);
            const res = await requestFn(config);
            setIsLoading(v => false);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    }, []);
    return {
        request, isLoading
    };
};
