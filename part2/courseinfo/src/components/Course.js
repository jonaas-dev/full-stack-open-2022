import Header from "./Header"
import Content from "./Content"
import Total from "./Total"


const Course = ( { course } ) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total sum={total} />
        </>
    )
}

export default Course