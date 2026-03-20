import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
        const charArray = characters.split('');

        // Matrix font size
        const fontSize = 14;
        let columns = Math.ceil(width / fontSize);

        // An array of drops - one per column
        let drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * height; // initial random y position
        }

        const draw = () => {
            // Create a translucent black rectangle to create trails
            ctx.fillStyle = 'rgba(5, 5, 16, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                // Get a random character
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Random coloring (mostly green, sometimes amber, rare bright white)
                const randColor = Math.random();
                if (randColor > 0.99) {
                    ctx.fillStyle = '#ffffff';
                } else if (randColor > 0.95) {
                    ctx.fillStyle = '#ffb000'; // Amber
                } else {
                    ctx.fillStyle = '#33ff00'; // Phosphor green
                }

                // Draw the character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Move drop down
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.ceil(width / fontSize);
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * height;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                opacity: 0.15
            }}
        />
    );
};

export default MatrixRain;
