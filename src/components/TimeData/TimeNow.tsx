import React, {useEffect, useState} from "react";
import {TimeNowStyle} from "./TimeNowStyle";


function Data() {
    const [time, setTime] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div style={TimeNowStyle}>
            {time}
        </div>
    );
}

export default Data;