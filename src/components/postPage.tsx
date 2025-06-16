import Categories, {ICategory} from './Categories.tsx'
import Posts from './posts.tsx'
import {useState} from "react";


function PostPage() {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    const handleSelectCategory = (category: ICategory) => {
        if(category.id === selectedCategory?.id){
            setSelectedCategory(null);
        }else{
            setSelectedCategory(category);
        }
    };
    return (
        <>
                <Categories
                    onSelectCategory={handleSelectCategory}
                    selectedCategory={selectedCategory}

                />
            <div className="flex flex-col w-screen ">
                <Posts
                    filterCategory={selectedCategory}
                    filterUser={null}
                />

            </div>


        </>
    )
}

export default PostPage;