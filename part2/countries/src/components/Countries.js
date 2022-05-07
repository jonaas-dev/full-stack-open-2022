import { useState } from 'react'
import Country from './Country'
import Button from './Button'

const Countries = ({ countries }) => {
    const [country, setCountry] = useState(null)

    if(country) {
        return <Country country={country}/>
    }

    return (
        <> 
            {countries.map((country) => (
                <p key={country.cca2 + country.cca3 + country.ccn3 + country.cioc}>
                    {country.name.common} <Button handleClick={() => setCountry(country) } label='show' />
                </p>
            ))}
        </>
    )
}

export default Countries