import React, { useEffect, useState } from 'react'


const Itemcontainer = ({ title, handleFetch }) => {
    return (
        <div onClick={() => handleFetch(title)} className="flex w-auto px-2 rounded-full bg-slate-200">{title}</div>
    )
}

const SingleItemcontainer = ({ category, icon_url, id, updated_at, value }) => {
    return (
        <div className="flex md:h-[250px] md:w-1/2 w-full p-2">

            <div className="flex h-full shadow-2xl bg-white w-full gap-x-2">

                <div className="flex  w-1/4">  <img src={icon_url} className="flex h-full w-full rounded-md border " />
                </div>

                <div className="flex h-full w-3/4 p-2 gap-y-2 flex-col  ">
                    <span className=" text-red-500 font-bold capitalize">{category}</span>
                    <div className="flex bg-slate-300 flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                        {id}</div>
                    <div className="flex bg-slate-300 flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>{updated_at}
                    </div>
                    <div className="flex bg-slate-300 flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                        {value}
                    </div>

                </div>
            </div>
        </div>
    )
}



function Index() {

    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [category, setCategory] = useState("")


    const handleFetch = (category) => {
        fetch(`https://api.chucknorris.io/jokes/search?query=${category}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.result[0]);
                setItems(data.result);
                setCategory(category)
            });
    }
    useEffect(() => {
        fetch('https://api.chucknorris.io/jokes/categories')
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                setCategories(data);
            });
    }, []);


    return (
        <div className='w-full h-full flex-col'>
            <div className="flex w-full md:flex-col  items-center justify-center">
                <div className="flex w-full h-24  items-center justify-center">
                    <div className="flex gap-x-2  ">
                        {categories !== undefined && categories?.map((cat, key) => (
                            <Itemcontainer handleFetch={handleFetch} key={key} title={cat} />
                        ))}
                    </div>
                </div>

                <div className="flex w-full px-20 flex-wrap ">
                    {items.length === 0 && <div className='flex font-bold items-center justify-center w-full h-full '> No items for this Category</div>}
                    <div className="flex w-full flex-wrap ">
                        {items !== undefined && items?.map((item) => (
                            <SingleItemcontainer category={category} key={item.id} icon_url={item.icon_url} id={item.id} value={item.value} updated_at={item.updated_at} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index