import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../data/json');

const readJsonFile = (fileName: string) => {
    const filePath = path.join(dataPath, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
};

export const getPcParts = () => {
    const cpu = readJsonFile('cpu.json');
    const gpu = readJsonFile('video-card.json');
    const motherboard = readJsonFile('motherboard.json');
    const ram = readJsonFile('memory.json');
    const storage = readJsonFile('internal-hard-drive.json');
    const psu = readJsonFile('power-supply.json');
    const cooling = readJsonFile('cpu-cooler.json');
    const os = readJsonFile('os.json');

    return {
        cpu,
        gpu,
        motherboard,
        ram,
        storage,
        psu,
        cooling,
        os
    };
};