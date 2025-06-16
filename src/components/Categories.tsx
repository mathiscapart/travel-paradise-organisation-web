    import {useState} from "react";
    import {useEffect} from "react";
    import axios from 'axios';


    export interface ICategory{
        id:number
        name:string
        color:string
    }

    interface CategoriesProps {
        onSelectCategory: (category: ICategory) => void;
        selectedCategory: ICategory | null;
    }


    function Categories({onSelectCategory, selectedCategory}: CategoriesProps) {
        const [categoryList, setCategoryList] = useState([]);
        async function catchCategories(){
            const res = await axios.get('http://172.16.33.151:3400/category');
            setCategoryList(res.data);

        }

        useEffect(() => {
            catchCategories()
        }, []);


        return (
            <>
                <h3 className="text-gray-500 font-jersey text-3xl ml-10">
                    Our categories
                </h3>
                <div className="p-5 text-gray-500 w-screen flex justify-start flex-wrap max-w-1/2 items-start gap-3">
                    {categoryList.map((category: ICategory, index: number) => {
                        const isActive = selectedCategory?.id === category.id;
                        return (
                            <button
                                key={index}
                                onClick={() => onSelectCategory(category)}
                                className={`flex items-center gap-3 rounded 
                ${isActive ? "bg-blue-950 text-white" : "bg-gray-900 text-gray-300"}`}
                            >
                                <div
                                    className="h-10 w-1 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                />
                                <h3 className="px-5 py-2">{category.name}</h3>
                            </button>
                        );
                    })}
                </div>
            </>
        );
    }

    export default Categories;