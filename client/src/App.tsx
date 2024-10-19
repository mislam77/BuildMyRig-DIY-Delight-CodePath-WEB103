import { useState, useEffect } from 'react';
import { getAllPcParts, createCustomItem } from './services/CustomItemsAPI';
import './App.css';

interface Part {
    name: string;
    price: number;
    type: string;
}

interface PcParts {
    [key: string]: Part[];
}

const App: React.FC = () => {
    const [pcParts, setPcParts] = useState<PcParts>({});
    const [cart, setCart] = useState<Part[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchPcParts = async () => {
            try {
                const parts = await getAllPcParts();
                console.log('Fetched PC parts:', parts); // Add this line for debugging
                setPcParts(parts);
            } catch (error) {
                console.error('Error fetching PC parts:', error);
            }
        };
        fetchPcParts();
    }, []);

    const addToCart = (part: Part) => {
        setCart([...cart, part]);
        setTotalPrice(totalPrice + part.price);
    };

    const createBuild = async () => {
        const customItem = {
            gpu: cart.find(part => part.type === 'gpu'),
            motherboard: cart.find(part => part.type === 'motherboard'),
            ram: cart.find(part => part.type === 'ram'),
            storage: cart.find(part => part.type === 'storage'),
            psu: cart.find(part => part.type === 'psu'),
            cooling: cart.find(part => part.type === 'cooling'),
            os: cart.find(part => part.type === 'os'),
            total_price: totalPrice
        };
        await createCustomItem({ ...customItem, name: 'Custom Build', price: totalPrice });
        // Handle UI update
    };

    return (
        <div>
            <header>
                <h1>BuildMyRig</h1>
                <p>Customize your PC with the best parts available.</p>
            </header>
            <section>
                <h2>Cart</h2>
                <ul>
                    {cart.map((part, index) => (
                        <li key={index}>{part.name} - ${part.price}</li>
                    ))}
                </ul>
                <p>Total Price: ${totalPrice}</p>
                <button onClick={createBuild}>Create Custom Build</button>
            </section>
            <section>
                <h2>Parts</h2>
                {Object.keys(pcParts).map((partType) => (
                    <div key={partType}>
                        <h3>{partType}</h3>
                        <ul>
                            {pcParts[partType].map((part: Part) => (
                                <li key={part.name}>
                                    {part.name} - ${part.price}
                                    <button onClick={() => addToCart(part)}>Add to Cart</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default App;