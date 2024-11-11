import React, { useEffect, useState } from 'react'


const Itemcontainer = ({ title, handleFetch }) => {
    return (
        <div onClick={() => handleFetch(title)} className="flex w-auto px-2 rounded-full items-center justify-center bg-slate-200">{title}</div>
    )
}
function truncateString(str, num) {
    if (str?.length > num) {
        return str?.slice(0, num) + '...';
    } else {
        return str;
    }
}

const SingleItemDetail = ({ value, check }) => {
    return (
        <div className="flex   flex items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
            <span className='bg-slate-200 px-2 py-1 rounded-md'> {value}</span>
            {check && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            }
        </div>
    )
}
const SingleItemcontainer = ({ category, icon_url, id, updated_at, value }) => {
    return (
        <div className="flex md:h-[200px] md:w-1/2 w-full p-2">

            <div className="flex h-full shadow-2xl bg-white w-full gap-x-2">

                <div className="flex  w-1/4">
                    <img src={icon_url} className="flex h-full w-full rounded-md  " />
                </div>

                <div className="flex h-full w-3/4 p-2 gap-y-2 flex-col  ">
                    <span className=" text-red-500 font-bold capitalize">{category}</span>
                    <SingleItemDetail value={id} />
                    <SingleItemDetail value={updated_at} />
                    <SingleItemDetail value={truncateString(value, 50)} check />


                </div>
            </div>
        </div>
    )
}



function Index() {

    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [category, setCategory] = useState("history")


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
        <div className='w-full h-full flex-col overflow-hidden'>
            <div className="flex w-full  flex-col  items-center md:justify-center">
                <div className="flex w-full md:h-24  items-center justify-center">
                    <div className="flex gap-x-2 md:gap-y-0 gap-y-2  flex-wrap ">
                        {categories !== undefined && categories?.map((cat, key) => (
                            <Itemcontainer handleFetch={handleFetch} key={key} title={cat} />
                        ))}
                    </div>
                </div>

                <div className="flex w-full md:px-20  flex-wrap ">
                    {items.length === 0 && <div className='flex font-bold items-center justify-center w-full h-full '> No items for this Category</div>}
                    <div className="flex w-full  flex-wrap ">
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