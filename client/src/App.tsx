import React, { useState, useEffect } from 'react';
import { getAllPcParts, createCustomItem, deletePartFromCustomItem, updatePartInCustomItem } from './services/CustomItemsAPI';
import Toast from './components/toast';

interface Part {
    name: string;
    price: number;
    type: string;
}

interface PcParts {
    [key: string]: Part[];
}

interface CustomBuild {
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

const App: React.FC = () => {
    const [pcParts, setPcParts] = useState<PcParts>({});
    const [cart, setCart] = useState<Part[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedPartType, setSelectedPartType] = useState<string | null>(null);
    const [customBuildName, setCustomBuildName] = useState('');
    const [customBuilds, setCustomBuilds] = useState<CustomBuild[]>([]);
    const [selectedBuildId, setSelectedBuildId] = useState<number | null>(null);
    const [partToUpdate, setPartToUpdate] = useState<{ buildId: number; partType: string } | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPcParts = async () => {
            try {
                const parts = await getAllPcParts();
                console.log('Fetched PC parts:', parts);
                setPcParts(parts);
            } catch (error) {
                console.error('Error fetching PC parts:', error);
            }
        };
        fetchPcParts();
    }, []);

    const addToCart = (part: Part, type: string) => {
        const partWithType = { ...part, type };
        setCart([...cart, partWithType]);
        setTotalPrice(totalPrice + part.price);
    };

    const removeFromCart = (index: number) => {
        const part = cart[index];
        setCart(cart.filter((_, i) => i !== index));
        setTotalPrice(totalPrice - part.price);
    };

    const validateBuild = () => {
        const partTypes = cart.map(part => part.type);
        const uniquePartTypes = new Set(partTypes);
        return partTypes.length === uniquePartTypes.size;
    };

    const createBuild = async () => {
        if (!validateBuild()) {
            setToastMessage('You cannot have two items from the same part type.');
            return;
        }

        const cpu = cart.find(part => part.type === 'cpu');
        const gpu = cart.find(part => part.type === 'gpu');
        const motherboard = cart.find(part => part.type === 'motherboard');
        const ram = cart.find(part => part.type === 'ram');
        const storage = cart.find(part => part.type === 'storage');
        const psu = cart.find(part => part.type === 'psu');
        const cooling = cart.find(part => part.type === 'cooling');
        const os = cart.find(part => part.type === 'os');

        console.log('CPU found:', cpu);
        console.log('GPU found:', gpu);
        console.log('Motherboard found:', motherboard);
        console.log('RAM found:', ram);
        console.log('Storage found:', storage);
        console.log('PSU found:', psu);
        console.log('Cooling found:', cooling);
        console.log('OS found:', os);

        const customItem = {
            id: Date.now(),
            name: customBuildName,
            price: totalPrice,
            cpu: cpu ? cpu.name : null,
            gpu: gpu ? gpu.name : null,
            motherboard: motherboard ? motherboard.name : null,
            ram: ram ? ram.name : null,
            storage: storage ? storage.name : null,
            psu: psu ? psu.name : null,
            cooling: cooling ? cooling.name : null,
            os: os ? os.name : null,
            total_price: totalPrice
        };

        console.log('Custom item to be created:', customItem);

        try {
            const createdItem = await createCustomItem(customItem);
            setCustomBuilds([...customBuilds, createdItem]);
            // Clear the cart and reset the form
            setCart([]);
            setTotalPrice(0);
            setCustomBuildName('');
        } catch (error) {
            console.error('Error creating custom build:', error);
        }
    };

    const toggleBuildDetails = (buildId: number) => {
        setSelectedBuildId(selectedBuildId === buildId ? null : buildId);
    };

    const deletePartFromBuild = async (buildId: number, partType: string) => {
        try {
            const updatedBuild = await deletePartFromCustomItem(buildId, partType);
            setCustomBuilds(customBuilds.map(build => build.id === buildId ? updatedBuild : build));
        } catch (error) {
            console.error('Error deleting part from custom build:', error);
        }
    };

    const updatePartInBuild = async (buildId: number, partType: string, newPart: Part) => {
        try {
            const updatedBuild = await updatePartInCustomItem(buildId, partType, newPart.name);
            setCustomBuilds(customBuilds.map(build => build.id === buildId ? updatedBuild : build));
            setPartToUpdate(null);
        } catch (error) {
            console.error('Error updating part in custom build:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">BuildMyRig</h1>
                <p className="text-lg text-gray-400">Customize your PC with the best parts available.</p>
            </header>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cart</h2>
                <input
                    type="text"
                    value={customBuildName}
                    onChange={(e) => setCustomBuildName(e.target.value)}
                    placeholder="Enter custom build name"
                    className="mb-4 p-2 border border-gray-300 rounded text-black"
                />
                <ul className="list-disc pl-5 mb-4">
                    {cart.map((part, index) => (
                        <li key={index} className="flex justify-between items-center">
                            {part.name} - ${part.price}
                            <button onClick={() => removeFromCart(index)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <p className="text-xl font-semibold">Total Price: ${totalPrice}</p>
                <button onClick={createBuild} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Create Custom Build
                </button>
            </section>
            <section>
                <h2 className="text-2xl font-semibold mb-4">Parts</h2>
                {Object.keys(pcParts).map((partType) => (
                    <div key={partType} className="mb-4">
                        <h3
                            onClick={() => setSelectedPartType(selectedPartType === partType ? null : partType)}
                            className="text-xl font-semibold cursor-pointer text-blue-500"
                        >
                            {partType}
                        </h3>
                        {selectedPartType === partType && (
                            <ul className="list-disc pl-5 mt-2">
                                {pcParts[partType].slice(0, 10).map((part: Part) => (
                                    <li key={part.name} className="flex justify-between items-center">
                                        {part.name} - ${part.price}
                                        <button onClick={() => addToCart(part, partType)} className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700">
                                            Add to Cart
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </section>
            <section>
                <h2 className="text-2xl font-semibold mb-4">My Builds</h2>
                {customBuilds.length === 0 ? (
                    <p>You don't have any builds. Get to building!</p>
                ) : (
                    customBuilds.map((build) => (
                        <div key={build.id} className="mb-4">
                            <h3
                                onClick={() => toggleBuildDetails(build.id)}
                                className="text-xl font-semibold cursor-pointer text-blue-500"
                            >
                                {build.name}
                            </h3>
                            {selectedBuildId === build.id && (
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <div className="font-bold">Part</div>
                                    <div className="font-bold">Delete</div>
                                    <div className="font-bold">Update</div>
                                    {Object.entries(build).map(([partType, partName]) => (
                                        partType !== 'id' && partType !== 'name' && partType !== 'total_price' && partName && (
                                            <React.Fragment key={partType}>
                                                <div>{partType}: {partName}</div>
                                                <button onClick={() => deletePartFromBuild(build.id, partType)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                                                    Delete
                                                </button>
                                                <button onClick={() => setPartToUpdate({ buildId: build.id, partType })} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700">
                                                    Update
                                                </button>
                                            </React.Fragment>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </section>
            {partToUpdate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded text-black">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Update {partToUpdate.partType}</h2>
                            <button onClick={() => setPartToUpdate(null)} className="text-2xl">&times;</button>
                        </div>
                        <ul className="list-disc pl-5 mt-2">
                            {pcParts[partToUpdate.partType].slice(0, 10).map((part: Part) => (
                                <li key={part.name} className="flex justify-between items-center">
                                    {part.name} - ${part.price}
                                    <button onClick={() => updatePartInBuild(partToUpdate.buildId, partToUpdate.partType, part)} className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700">
                                        Select
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            )}
        </div>
    );
};

export default App;