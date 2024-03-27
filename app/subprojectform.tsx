'use client'
import { useState, FormEvent, ChangeEvent } from 'react';
import locationsData from './api/subprojects/datas/locationData';
import { SubprojectType } from './api/subprojects/datas/subprojecttype';
import Image from 'next/image';
import Swal from 'sweetalert2';
import SearchPage from './search';
import { motion } from 'framer-motion';

interface FormData {
    subprojectName: string;
    description: string;
    region: string;
    province: string;
    municipality: string;
    projectCost: string;
    subprojectType: SubprojectType | '';
}

export default function SubprojectForm() {
    const [formData, setFormData] = useState<FormData>({
        subprojectName: '',
        description: '',
        region: '',
        province: '',
        municipality: '',
        projectCost: '',
        subprojectType: '',
    });

    const [searchPage, setSearchPage] = useState(false)

    const [errors, setErrors] = useState({
        subprojectName: '',
        subprojectType:'',
        region:'',
        province:'',
        municipality:'',
        description: '',
        projectCost: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        if (name === 'projectCost' && !/^\d*$/.test(value)) return; // Only accept numbers
        setFormData({ ...formData, [name]: value });
    };

    const handleClear = () => {
        setFormData({
            subprojectName: '',
            description: '',
            region: '',
            province: '',
            municipality: '',
            projectCost: '',
            subprojectType: '',
        });
        setErrors({
            subprojectName: '',
            subprojectType:'',
            region:'',
            province:'',
            municipality:'',
            description: '',
            projectCost: '',
        });

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Form data cleared successfully!',
            });
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation for subproject name, description, project cost, subproject type, region, and province
        const newErrors = { ...errors };
        let hasError = false;
    
        // Validation for subproject name, description, and project cost (same as before)
        if (!formData.subprojectName.trim()) {
            newErrors.subprojectName = 'Subproject name is required';
            hasError = true;
        } else {
            newErrors.subprojectName = '';
        }
    
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            hasError = true;
        } else {
            newErrors.description = '';
        }
    
        if (!formData.projectCost.trim()) {
            newErrors.projectCost = 'Project cost is required';
            hasError = true;
        } else if (!/^\d{1,3}(,\d{3})*(\.\d{2})?$/.test(formData.projectCost.trim())) {
            newErrors.projectCost = 'Invalid project cost format';
            hasError = true;
        } else {
            newErrors.projectCost = '';
        }
    
        // Validation for subproject type
        if (!formData.subprojectType.trim()) {
            newErrors.subprojectType = 'Subproject type is required';
            hasError = true;
        } else {
            newErrors.subprojectType = '';
        }
    
        // Validation for region
        if (!formData.region.trim()) {
            newErrors.region = 'Region is required';
            hasError = true;
        } else {
            newErrors.region = '';
        }
    
        // Validation for province
        if (!formData.province.trim()) {
            newErrors.province = 'Province is required';
            hasError = true;
        } else {
            newErrors.province = '';
        }

        if (!formData.municipality.trim()) {
            newErrors.municipality = 'Municipality is required';
            hasError = true;
        } else {
            newErrors.municipality = '';
        }
    
        setErrors(newErrors);
    
        if (!hasError) {
            // Retrieve existing form data from localStorage
            const existingFormData = localStorage.getItem('formData');
            let updatedFormData = [];
    
            if (existingFormData) {
                // Parse existing data from localStorage
                updatedFormData = JSON.parse(existingFormData);
    
                // Check if existing data is an array
                if (!Array.isArray(updatedFormData)) {
                    // If not an array, initialize an empty array
                    updatedFormData = [];
                }
            }
    
            // Append new form data to existing data
            updatedFormData.push(formData);
    
            // Store updated form data in localStorage
            localStorage.setItem('formData', JSON.stringify(updatedFormData));
    
            // Reset form data
            setFormData({
                subprojectName: '',
                description: '',
                region: '',
                province: '',
                municipality: '',
                projectCost: '',
                subprojectType: '',
            });
    
            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Form data submitted successfully!',
            });
        }
    };
    
    


    return (
        <div>
            {searchPage ?
             <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
         >
             <SearchPage open={() => setSearchPage(!searchPage)} />
         </motion.div>
            :<>
             <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
                <div className=' items-center mt-10 p-6 flex flex-row gap-2 justify-between bg-gradient-to-br from-yellow-300 to-orange-500 rounded-lg shadow-2xl '>
                <label className='sm:text-sm md:text-base lg:text-lg xl:text-3xl font-bold text-black text-center w-full flex justify-center'>
                    SUBPROJECT PROFILE ENTRY FORM
                </label>
                <Image src="/DA_Logo.png" alt="DA Logo" width={40} height={40} />
            </div>

            <div className="mx-auto mt-2 p-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg shadow-2xl border-t-4 border-indigo-500">

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subprojectName" className="sm:text-sm md:text-base lg:text-lg block font-bold text-black">Subproject Name</label>
                        <input
                            id="subprojectName"
                            type="text"
                            name="subprojectName"
                            placeholder="Enter subproject name"
                            value={formData.subprojectName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                        />
                        {errors.subprojectName && <p className="text-red-500 text-sm">{errors.subprojectName}</p>}
                    </div>
                    <div>
                        <label htmlFor="subprojectType" className="sm:text-sm md:text-base lg:text-lg block font-bold text-black">Subproject Type</label>
                        <select
                            id="subprojectType"
                            name="subprojectType"
                            value={formData.subprojectType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black">
                            <option value="">Select subproject type</option>
                            {Object.values(SubprojectType).map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.subprojectType && <p className="sm:text-sm md:text-base lg:text-lg text-red-500 text-sm">{errors.subprojectType}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="sm:text-sm md:text-base lg:text-lg block font-bold text-black">Description</label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                        />
                        {errors.description && <p className="sm:text-sm md:text-base lg:text-lg text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="region" className="sm:text-sm md:text-base lg:text-lg block font-bold text-black">Region</label>
                        <select
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                        >
                            <option value="">Select region</option>
                            {locationsData.regions.map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        {errors.region && <p className="sm:text-sm md:text-base lg:text-lg text-red-500 text-sm">{errors.region}</p>}
                    </div>
                    <div>
                        <label htmlFor="province" className="sm:text-sm md:text-base lg:text-lg block font-bold text-black">Province</label>
                        <select
                            id="province"
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                        >
                            <option value="">Select province</option>
                            {formData.region && locationsData.provincesByRegion[formData.region].map((province) => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                        {errors.province && <p className="sm:text-sm md:text-base lg:text-lg text-red-500 text-sm">{errors.province}</p>}
                    </div>
                    <div>
                        <label htmlFor="municipality" className="sm:text-sm md:text-base lg:text-lg block font-bold text-black">Municipality</label>
                        <input
                            id="municipality"
                            type="text"
                            name="municipality"
                            placeholder="Enter municipality"
                            value={formData.municipality}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                        />
                         {errors.municipality && <p className="sm:text-sm md:text-base lg:text-lg text-red-500 text-sm">{errors.municipality}</p>}
                    </div>
                    <div>
                        <label htmlFor="projectCost" className="sm:text-sm md:text-base lg:text-lg block font-bold text-black">Project Cost (PHP)</label>
                        <input
                            id="projectCost"
                            type="text"
                            name="projectCost"
                            placeholder="Enter project cost"
                            value={formData.projectCost}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                        />
                        {errors.projectCost && <p className="sm:text-sm md:text-base lg:text-lg text-red-500 text-sm">{errors.projectCost}</p>}
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="ml-2 px-4 py-2 shadow-lg bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600">Save</button>
                        <button type="button" onClick={handleClear} className="ml-2 px-4 py-2 shadow-lg bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600">Clear</button>
                     
    <button type="button" className="ml-2 px-4 py-2 shadow-lg bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600" onClick={()=> setSearchPage(true)}>Search</button>


                    </div>

                </form>

            </div>
            </motion.div>
            </>}
      
        </div>
    );
}
