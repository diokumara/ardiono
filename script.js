tailwind.config = {
    theme: {
        extend: {
            colors: {
                arduino: {
                    DEFAULT: '#00878F',
                    dark: '#005C62',
                    light: '#00A3AC',
                    accent: '#E6F4F1',
                    darkbg: '#0B191E',
                    cardbg: '#12252C'
                }
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            }
        }
    }
}

// Interactive Script
let currentStep = 1;
let blinkInterval = null;

function setSimStep(step) {
    currentStep = step;
    updateSimulatorUI();
}

function nextSimStep() {
    currentStep = currentStep >= 3 ? 1 : currentStep + 1;
    updateSimulatorUI();
}

function updateSimulatorUI() {
    const pwrLed = document.getElementById('led-pwr');
    const lLed = document.getElementById('led-l');
    const statusText = document.getElementById('sim-status');
    const descText = document.getElementById('sim-description');

    // Clear blinking if active
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }

    // Update button styles
    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById(`btn-step-${i}`);
        if (i === currentStep) {
            btn.className = "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 bg-arduino/10 border-arduino text-white shadow-md";
        } else {
            btn.className = "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600";
        }
    }

    // Update Simulation States
    if (currentStep === 1) {
        pwrLed.className = "w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]";
        lLed.className = "w-4 h-4 rounded-full bg-gray-700 border border-gray-500";
        statusText.innerText = "Status: Kabel USB Terhubung (Power ON)";
        statusText.className = "text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30";
        descText.innerText = "Kabel USB telah terpasang! Indikator daya (PWR) menyala hijau. Board siap dikonfigurasi di IDE.";
    }
    else if (currentStep === 2) {
        pwrLed.className = "w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]";
        lLed.className = "w-4 h-4 rounded-full bg-amber-500/40 border border-amber-500";
        statusText.innerText = "Status: Terhubung ke COM3 (Arduino Uno)";
        statusText.className = "text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30";
        descText.innerText = "Port serial COM3 & Board Arduino Uno terpilih di menu Arduino IDE. Siap mengunggah program.";
    }
    else if (currentStep === 3) {
        pwrLed.className = "w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]";
        statusText.innerText = "Status: Program Blink Berhasil Diunggah!";
        statusText.className = "text-xs font-mono text-arduino-light bg-arduino/20 px-2.5 py-1 rounded border border-arduino/40";
        descText.innerText = "Sukses! LED 13 bawaan board sekarang berkedip setiap 1 detik sesuai dengan program Blink.";

        // Start blinking simulation
        let state = false;
        blinkInterval = setInterval(() => {
            state = !state;
            if (state) {
                lLed.className = "w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] border border-amber-300";
            } else {
                lLed.className = "w-4 h-4 rounded-full bg-gray-700 border border-gray-500";
            }
        }, 800);
    }
}

// Initialize state on load
window.onload = function () {
    updateSimulatorUI();
};