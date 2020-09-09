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
        tool: 'free'
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
        contextRef.current.strokeStyle = properties.color;
        contextRef.current.lineWidth = properties.size;
        if (properties.tool === 'straight') {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.beginPath()
            contextRef.current.moveTo(offsetX, offsetY)
        }
        if (properties.tool === 'rectangle') {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.moveTo(offsetX, offsetY)
        }
        if (properties.tool === 'free') {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.beginPath()
            contextRef.current.moveTo(offsetX, offsetY)
            setIsDrawing(true)
        }
    }
    const stopDrawing = ({ nativeEvent }) => {
        if (properties.tool === 'straight') {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
            contextRef.current.closePath()
        }
        if (properties.tool === 'rectangle') {
            console.log(contextRef.current)
            contextRef.current.rect()
        }
        if (properties.tool === 'free') {
            contextRef.current.closePath()
            setIsDrawing(false)
        }
    }
    const stopAll = () => {
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
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }
    return (
        <Layout>
            <div className='canvasSettings'>
                <div>
                    <label className='settingsItem' >Height</label>
                    <input className='settingsItem' type='range' min={1} max={2000} name='height' value={screenSize.height} onChange={handleChangeSize} />
                    <label className='settingsItem' >Width</label>
                    <input className='settingsItem' type='range' min={1} max={2000} name='width' value={screenSize.width} onChange={handleChangeSize} />
                    <label className='settingsItem' >Brush Size</label>
                    <input className='settingsItem' type='range' min={.5} max={300} name='size' value={properties.size} onChange={handlePropertyChange} />
                </div>
                <div className='flexSettings'>
                    <div className='flexSettingsItem'>
                        <label>Brush Color: </label>
                        <input type='color' name='color' value={properties.color} onChange={handlePropertyChange} />
                    </div>
                    <div className='flexSettingsItem'>
                        <label>Tool: </label>
                        <select name='tool' value={properties.tool} onChange={handlePropertyChange}>
                            <option value='free'>Free</option>
                            <option value='straight'>Straight</option>
                            <option value='rectangle'>Rectangle</option>
                        </select>
                    </div>
                </div>
            </div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopAll}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </Layout>
    )
}

export default Canvas;