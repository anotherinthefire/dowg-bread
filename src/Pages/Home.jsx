import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Home() {
    const [dogs, setDogs] = useState([])
    const [text, setText] = useState("")
    const [searched, setSearched] = useState(false)

    useEffect(() => {
        const fetchDogData = async () => {
            try {
                const response = await axios.get("https://api.thedogapi.com/v1/breeds")
                const data = response.data;
                setDogs(data)
            } catch (error) {
                console.error(error)
            }
        }

        setSearched(false)
        fetchDogData()
    }, [])

    const searchForDog = async () => {
        try {
            const response = await axios.get(
                `https://api.thedogapi.com/v1/breeds/search?q=${text}`
            );
            const data = response.data;
            setDogs(data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        searchForDog()
        setSearched(true)
    }

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <>
            {!dogs ? (
                <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
                    Loading...
                </h1>
            ) : (
                <>
                    <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
                        <div className="items-start justify-between gap-x-4 py-4 border-b sm:flex">

                            {/* Header */}
                            <div className="max-w-lg">
                                <h3 className="text-gray-800 text-2xl font-bold cursor-pointer" onClick={handleRefresh}>
                                    Dog Breads
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    This application is powered by{" "}
                                    <a
                                        href="https://thedogapi.com"
                                        className=" underline text-red-600"
                                    >
                                        The Dog Api
                                    </a>
                                </p>
                            </div>

                            {/* search bard */}
                            <div className="mt-6 sm:mt-0">
                                <div className="relative">
                                    <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                    </svg>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="max-w-xl mx-auto"
                                        autoComplete="off"
                                    >
                                        <input
                                            type="text"
                                            name="search"
                                            id="search"
                                            placeholder="Search bread"
                                            className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 rounded-lg sm:max-w-xs"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* default dog cards */}
                    <section className="p-8 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20">
                            {!searched ? (
                                dogs.map((dog) => (
                                    <Link to={`/${dog.name}`} key={dog.id}>
                                        <img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} loading="lazy" className="w-full rounded-lg" />
                                        <div className="mt-3 space-y-2">
                                            <span className="block text-red-600 text-sm">Life span: {dog.life_span}</span>
                                            <h3 className="text-lg text-gray-800 duration-150 group-hover:text-red-600 font-semibold">
                                                {dog.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">Bred For: {dog.bred_for}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <>
                                    {/* search dog cards */}
                                    {dogs.map((dog) => (
                                        <li className="w-full mx-auto group sm:max-w-sm list-none" key={dog.id}>
                                            <Link to={`/${dog.name}`} key={dog.id}>
                                                <img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} loading="lazy" className="w-full rounded-lg" />
                                                <div className="mt-3 space-y-2">
                                                    <span className="block text-red-600 text-sm">Life span: {dog.life_span}</span>
                                                    <h3 className="text-lg text-gray-800 duration-150 group-hover:text-red-600 font-semibold">
                                                        {dog.name}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">Bred For: {dog.bred_for}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            )}
                        </div>
                    </section>
                </>
            )}
        </>
    )
}