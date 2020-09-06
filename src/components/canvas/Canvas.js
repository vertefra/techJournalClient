import React, { useRef, useEffect, useState } from "react";
import Layout from "../layout/Layout"
import './canvas.css'

function Canvas() {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false);
    const [properties, updateProperties] = useState({
        color: 'rgba(0, 0, 0, 1)',
        size: 5,
        width: window.innerWidth - 50,
        height: window.innerHeight - 120
    })
    const [screenSize, changeSize] = useState({
        width: window.innerWidth - 50,
        height: window.innerHeight - 120
    })
    const handleChangeSize = (event) => {
        event.preventDefault()
        changeSize({ ...screenSize, [event.target.name]: event.target.value })
    }
    const handlePropertyChange = (event) => {
        event.preventDefault()
        updateProperties({ ...properties, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = screenSize.width * 2;
        canvas.height = screenSize.height * 2;
        canvas.style.width = `${screenSize.width}px`;
        canvas.style.height = `${screenSize.height}px`;
        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = properties.color;
        context.lineWidth = 5;
        contextRef.current = context;
    }, [screenSize])
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }
    const stopDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineCap = 'round';
        contextRef.current.lineJoin = 'round'
        contextRef.current.strokeStyle = properties.color;
        contextRef.current.lineWidth = properties.size;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }
    return (
        <Layout>
            <div>
                <label>Height</label>
                <input type='range' min={1} max={2000} name='height' value={screenSize.height} onChange={handleChangeSize} />
                <label>Size</label>
                <input type='range' min={1} max={300} name='size' value={properties.size} onChange={handlePropertyChange} />
                <input type='color' name='color' value={properties.color} onChange={handlePropertyChange} />
            </div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </Layout>
    )
}

export default Canvas;