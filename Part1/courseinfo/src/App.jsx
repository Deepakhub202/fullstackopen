const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

  const Header = () => <h1>{course.name}</h1>

  const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

  const Content = () => (
    <div>
      <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
    </div>
  )

  const Total = () => {
    const totalExercises =
      course.parts[0].exercises +
      course.parts[1].exercises +
      course.parts[2].exercises

    return <p>Total exercises: {totalExercises}</p>
  }

  return (
    <div>
      <Header/>
      <Content/>
      <Total/>
    </div>
  )
}

export default App
