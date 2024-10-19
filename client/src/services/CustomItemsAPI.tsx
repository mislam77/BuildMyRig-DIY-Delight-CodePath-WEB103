const API_URL = 'http://localhost:3000/api';

export const getAllPcParts = async () => {
    const response = await fetch(`${API_URL}/pc-parts`);
    if (!response.ok) {
        throw new Error('Failed to fetch PC parts');
    }
    return response.json();
};

interface CustomItem {
    id: number;
    name: string;
    cpu: string | null;
    gpu: string | null;
    motherboard: string | null;
    ram: string | null;
    storage: string | null;
    psu: string | null;
    cooling: string | null;
    os: string | null;
    total_price: number;
}

export const createCustomItem = async (item: CustomItem) => {
    const response = await fetch(`${API_URL}/custom-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
    if (!response.ok) {
        throw new Error('Failed to create custom item');
    }
    return response.json();
};

export const deletePartFromCustomItem = async (id: number, partType: string) => {
    const response = await fetch(`${API_URL}/custom-items/${id}/${partType}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete part from custom item');
    }
    return response.json();
};

export const updatePartInCustomItem = async (id: number, partType: string, newPart: string) => {
    const response = await fetch(`${API_URL}/custom-items/${id}/${partType}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPart })
    });
    if (!response.ok) {
        throw new Error('Failed to update part in custom item');
    }
    return response.json();
};