const API_URL = 'http://localhost:3000/api';

export const getAllPcParts = async () => {
    const response = await fetch(`${API_URL}/pc-parts`);
    return response.json();
};

interface CustomItem {
    // Define the properties of CustomItem here
    name: string;
    price: number;
    // Add other properties as needed
}

export const createCustomItem = async (item: CustomItem) => {
    const response = await fetch(`${API_URL}/custom-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
    return response.json();
};
export const getCustomItemById = async (id: number) => {
    const response = await fetch(`${API_URL}/custom-items/${id}`);
    return response.json();
};

export const updateCustomItem = async (id: number, item: CustomItem) => {
    const response = await fetch(`${API_URL}/custom-items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
    return response.json();
};

export const deleteCustomItem = async (id: number) => {
    const response = await fetch(`${API_URL}/custom-items/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};