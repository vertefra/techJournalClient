import React, { useRef, useEffect, useState } from "react";
import Layout from "../layout/Layout"
import './canvas.css'

function Canvas() {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false);
    const [properties, updateProperties] = useState({
        color: '#000000',
        size: 5,
        tool: 'free',
        path: 'round'
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
    let startX;
    let startY;
    const startDrawing = ({ nativeEvent }) => {
        contextRef.current.strokeStyle = properties.color;
        contextRef.current.lineWidth = properties.size;
        contextRef.current.lineCap = properties.path;
        contextRef.current.lineJoin = properties.path;
        if (properties.tool === 'straight') {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.beginPath()
            contextRef.current.moveTo(offsetX, offsetY)
        }
        if (properties.tool === 'rectangle') {
            const { offsetX, offsetY } = nativeEvent;
            startX = offsetX;
            startY = offsetY;
            contextRef.current.beginPath()
            contextRef.current.moveTo(offsetX, offsetY)
        }
        if (properties.tool === 'fillRect') {
            contextRef.current.fillStyle = properties.color;
            const { offsetX, offsetY } = nativeEvent;
            startX = offsetX;
            startY = offsetY;
            contextRef.current.beginPath()
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
        const { offsetX, offsetY } = nativeEvent;
        if (properties.tool === 'straight') {
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.closePath()
            contextRef.current.stroke();
        }
        if (properties.tool === 'rectangle') {
            contextRef.current.rect(startX, startY, offsetX - startX, offsetY - startY)
            contextRef.current.closePath()
            contextRef.current.stroke();
        }
        if (properties.tool === 'fillRect') {
            contextRef.current.fillRect(startX, startY, offsetX - startX, offsetY - startY)
            contextRef.current.closePath()
            contextRef.current.stroke();
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
        if (properties.tool === 'free') {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    }
    return (
        <Layout>
            <div className='canvasSettings'>
                <div className='flexSettings'>
                    <label className='settingsItem' >Height</label>
                    <input className='settingsItem' type='range' min={1} max={2000} name='height' value={screenSize.height} onChange={handleChangeSize} />
                    <label className='settingsItem' >Width</label>
                    <input className='settingsItem' type='range' min={1} max={2000} name='width' value={screenSize.width} onChange={handleChangeSize} />
                </div>
                <div className='flexSettings'>
                    <label className='settingsItem' >Brush Size</label>
                    <input className='settingsItem' type='range' min={.5} max={300} name='size' value={properties.size} onChange={handlePropertyChange} />
                    <div className='flexSettingsBox'>
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
                                <option value='fillRect'>Filled Rectangle</option>
                            </select>
                        </div>
                        <div className='flexSettingsItem'>
                            <label>Path Shape: </label>
                            <select name='path' value={properties.path} onChange={handlePropertyChange}>
                                <option value='round'>Round</option>
                                <option value='square'>Square</option>
                            </select>
                        </div>
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