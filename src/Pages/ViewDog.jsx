import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

export default function ViewDog() {
    const [dog, setDog] = useState([])
    const { name } = useParams()

    useEffect(() => {
        const fetchSingleDogData = async () => {
            try {
                const response = await axios.get(
                    `https://api.thedogapi.com/v1/breeds/search?q=${name}`
                );
                const data = response.data
                setDog(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchSingleDogData()
    }, [name])

    return (
        <>

            <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
                <div className="items-start justify-between gap-x-4 py-4 border-b sm:flex">

                    {/* Header */}
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-2xl font-bold">
                            <Link to="/">Dog Breads</Link>
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
                </div>
            </div>


            <section className="max-w-5xl mx-auto flex items-center justify-center">
                {dog.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center"
                    >
                        <article>
                            <img
                                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                                alt={item.name}
                            />
                        </article>
                        <article>
                            <h1 className="text-3xl font-bold text-black mb-8 lg:text-5xl">
                                {item.name}
                            </h1>
                            {item.description && (
                                <p className="text-black mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">
                                    {item.description}
                                </p>
                            )}

                            <ul className="text-sm text-black leading-loose lg:text-base lg:leading-relaxed">
                                <li>
                                    <span className="font-bold text-black">Bred For:</span>{" "}
                                    {item.bred_for}
                                </li>
                                <li>
                                    <span className="font-bold text-black">Height:</span>{" "}
                                    {item.height.metric} cm
                                </li>
                                <li>
                                    <span className="font-bold text-black">Weight:</span>{" "}
                                    {item.weight.metric} kgs
                                </li>
                                <li>
                                    <span className="font-bold text-black">Breed Group:</span>{" "}
                                    {item.breed_group}
                                </li>
                                <li>
                                    <span className="font-bold text-black">Lifespan:</span>{" "}
                                    {item.life_span}
                                </li>
                                <li>
                                    <span className="font-bold text-black">Temperament:</span>{" "}
                                    {item.temperament}
                                </li>
                            </ul>

                            <Link
                                to="/"
                                className="inline-block bg-white py-2 px-6 rounded mt-8 text-black hover:bg-black hover:text-white border border-black transition-all duration-200"
                            >
                                &larr; Back
                            </Link>
                        </article>
                    </div>
                ))}
            </section>
        </>
    )
}