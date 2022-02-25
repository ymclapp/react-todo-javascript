import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Products.css';

//import products from '../../data';
// import ProductCard from '../store/ProductCard';

// import CurrencyFormat from 'react-currency-format';
// import { Card } from 'react-bootstrap';

const dbAPI = 'http://localhost:1337/api/movies';

export default function Products() {

    const [movies, setMovies] = useState({data: []});

    useEffect(() => {
        getMoviesWithFetch();
    }, []);

const getMoviesWithFetch = async () => {
        const response = await fetch(dbAPI);
        const jsonData = await response.json({});
        setMovies(jsonData);
        console.log(jsonData);
    };

    return (
        <>
            <div className='products__wrapper'>
                {movies.data.map((movie) => (
                    // <ProductCard key={movie.id} product={movie} />
                    <p key={movie.id} product={movie}>{movie}</p>
                    // <Card.Text>
                    // <CurrencyFormat className='text-center' value={film.attributes.budget} thousandSeparator={true} prefix={'$'} /> 
                    // </Card.Text>
                ))}
            </div>
        </>
    );
};
