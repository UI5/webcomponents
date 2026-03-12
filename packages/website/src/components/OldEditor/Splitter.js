import React, { useState, useRef, useEffect } from 'react';

export default function Splitter({ preview, editor }) {
    const [moving, setMoving] = useState(false);
    const [leftColumnSize, setLeftColumnSize] = useState("calc(50% - 0.5rem)");
    const [rightColumnSize, setRightColumnSize] = useState("calc(50% - 0.5rem)");
    const containerRef = useRef();

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!moving) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const clientX = e.touches?.length > 0 ? e.touches[0].clientX : e.clientX;
            const offsetX = clientX - containerRect.left;

            const leftPercent = Math.round((offsetX / containerRect.width) * 100);
            const rightPercent = 100 - leftPercent;

            console.log(leftPercent, rightPercent)

            setLeftColumnSize(`calc(${leftPercent}% - 0.5rem)`);
            setRightColumnSize(`calc(${rightPercent}% - 0.5rem)`);
        };

        const handleMouseUp = () => {
            setMoving(false);
        };

        if (moving) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.addEventListener("touchmove", handleMouseMove);
            document.addEventListener("touchend", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchmove", handleMouseMove);
            document.removeEventListener("touchend", handleMouseUp);
        };
    }, [moving]);

    const mousedownHandler = () => {
        setMoving(true);
    };

    return (
        <>
            {moving && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        cursor: 'col-resize',
                    }}
                />
            )}
            <div style={{ display: "flex", height: "90vh", minHeight: "600px" }} ref={containerRef}>
                <div style={{ width: leftColumnSize, minWidth: "10%", transition: "width 0.15s linear" }}>{preview}</div>
                <div
                    style={{
                        width: "1rem",
                        backgroundColor: "gainsboro",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                        userSelect: "none",
                        touchAction: "none",
                        cursor: "col-resize"
                    }}
                    onMouseDown={mousedownHandler}
                    onTouchStart={mousedownHandler}
                >
                    <svg viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                        <g role="presentation">
                            <path d="M176 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm160 96q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm-160 42q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm160 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zM176 278q20 0 34 14t14 34q0 19-14.5 33.5T176 374t-33.5-14.5T128 326q0-20 14-34t34-14zm160 0q20 0 34 14t14 34q0 19-14.5 33.5T336 374t-33.5-14.5T288 326q0-20 14-34t34-14zM176 416q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm160 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14z"></path>
                        </g>
                    </svg>
                </div>
                <div style={{ width: rightColumnSize, minWidth: "10%", transition: "width 0.15s linear" }}>{editor}</div>
            </div>
        </>
    );
}
