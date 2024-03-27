import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const SearchPage: React.FC<{ open: () => void }> = ({ open }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [formData, setFormData] = useState<any[]>([]);
    const [filteredFormData, setFilteredFormData] = useState<any[]>([]); // Change the type to any[]
    const [editedData, setEditedData] = useState<any[]>([]);
    useEffect(() => {
        // Load data from localStorage when component mounts
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        // Filter data based on search query
        const filteredData = formData.filter((item) =>
            item.subprojectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subprojectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.projectCost.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFormData(filteredData);
    };
    

    const handleBack = () => {
        open(); // Close the search page by calling the open function
    };
    const handleEdit = (index: number, field: string, value: any) => {
        const newData = [...editedData];
        newData[index] = { ...newData[index], [field]: value };
        setEditedData(newData);
    };

    const handleUpdate = (projectCost: any) => {
        const updatedData = formData.map((item, index) =>
            item.projectCost === projectCost && editedData[index] ? { ...item, ...editedData[index] } : item
        );
        setFormData(updatedData);
        localStorage.setItem('formData', JSON.stringify(updatedData));
        setEditedData([]);
    
        // Show success alert
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data updated successfully!',
        });
    };
    
    return (
        <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between mb-4">
                <button onClick={handleBack} className="px-4 shadow-lg py-2 bg-gray-500 text-white rounded-md focus:outline-none hover:bg-gray-600">
                    Back
                </button>
                <form onSubmit={handleSearch}>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search here"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ml-2 shadow-lg px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                        <button
                            type="submit"
                            className="ml-2 px-4 py-2 shadow-lg bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="overflow-x-auto">
                <div className="overflow-auto align-middle">
                    <table className="divide-y divide-gray-200 shadow-lg w-full">
                        {/* Table header */}
                        <thead className="bg-gradient-to-br from-yellow-200 to-orange-300 shadow-md">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subproject Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Province</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Municipality</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subproject Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Cost (PHP)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredFormData.map((item, index) => (
                                <tr key={index}>
                                    {/* Render table data */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis" contentEditable onBlur={(e) => handleEdit(index, 'subprojectName', e.target.innerText)}>{item.subprojectName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis" contentEditable onBlur={(e) => handleEdit(index, 'description', e.target.innerText)}>{item.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis" contentEditable onBlur={(e) => handleEdit(index, 'region', e.target.innerText)}>{item.region}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis" contentEditable onBlur={(e) => handleEdit(index, 'province', e.target.innerText)}>{item.province}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis" contentEditable onBlur={(e) => handleEdit(index, 'municipality', e.target.innerText)}>{item.municipality}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis" contentEditable onBlur={(e) => handleEdit(index, 'subprojectType', e.target.innerText)}>{item.subprojectType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis" contentEditable onBlur={(e) => handleEdit(index, 'projectCost', e.target.innerText)}>{item.projectCost}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600" onClick={() => handleUpdate(item.projectCost)}>Update</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
};

export default SearchPage;
