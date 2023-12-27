import React, { useEffect, useRef } from 'react';
import './AudioVisualizer.css';

const AudioVisualizer = () => {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContext = useRef(null);
    const audioSource = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        const canvasElement = canvasRef.current;
        canvasElement.width = 900; // Ajuste este valor para o que você precisa
        audioElement.addEventListener('play', startAudioContext);
        return () => {
            audioElement.removeEventListener('play', startAudioContext);
        };
    }, []);

    const startAudioContext = () => {
        const audioElement = audioRef.current;
        const canvasElement = canvasRef.current;
        const canvasContext = canvasElement.getContext('2d');

        if (!audioContext.current) {
            audioContext.current = new AudioContext();
            audioSource.current = audioContext.current.createMediaElementSource(audioElement);
        }

        const analyserNode = audioContext.current.createAnalyser();
        analyserNode.fftSize = 4096; // Aumentando o número de barras
        audioSource.current.connect(analyserNode);
        analyserNode.connect(audioContext.current.destination);

        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestAnimationFrame(draw);

            analyserNode.getByteFrequencyData(dataArray);

            canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

            const barWidth = (canvasElement.width / bufferLength) * 2.5;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2.0;
                const gradient = canvasContext.createLinearGradient(0, canvasElement.height - barHeight, 0, canvasElement.height);
                gradient.addColorStop(0, 'rgb(233, 190, 253)'); // Mais claro
                gradient.addColorStop(0.1, 'rgb(219, 169, 244)');
                gradient.addColorStop(0.2, 'rgb(205, 148, 235)');
                gradient.addColorStop(0.3, 'rgb(191, 127, 226)');
                gradient.addColorStop(0.4, 'rgb(177, 106, 217)');
                gradient.addColorStop(0.5, 'rgb(163, 85, 208)');
                gradient.addColorStop(0.6, 'rgb(149, 64, 199)');
                gradient.addColorStop(0.7, 'rgb(135, 43, 190)');
                gradient.addColorStop(0.8, 'rgb(121, 22, 181)');
                gradient.addColorStop(0.9, 'rgb(107, 1, 172)');
                gradient.addColorStop(1, 'rgb(84, 16, 132)'); // Mais escuro
            
                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(x, canvasElement.height - barHeight, barWidth, barHeight);
            
                x += barWidth + 3;
            }
        };

        draw();
    };

    return (
        <div className="audio-visualizer-container">
            <audio ref={audioRef} controls crossOrigin="anonymous" src="https://webradio.amsolution.com.br/radio/8020/plus" />
            <canvas ref={canvasRef} className="audio-visualizer-canvas" />
        </div>
    );
};

export default AudioVisualizer;