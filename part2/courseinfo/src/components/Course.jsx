const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ course }) => {
    const content = course.parts.map(part =>
        <p key={part.id}>
            {part.name} {part.exercises}
        </p>
    );
    return <>{content}</>;
};

const Total = ({ course }) => {
    const exercises = course.parts.map(
        part => part.exercises
    );
    const total = exercises.reduce(
        (sum, part) => sum + part
    , 0);
    return <><strong>Total of {total} exercises</strong></>;
};

const Course = ({ course }) => {
  return (
    <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </>
  );
};

export default Course;