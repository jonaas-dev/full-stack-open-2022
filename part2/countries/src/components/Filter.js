const Filter = ({ filter, setFilter }) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <>find countries <input value={filter} onChange={handleFilterChange}></input></>
    )
}

export default Filter