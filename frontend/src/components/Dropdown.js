import React, { useState, useEffect } from "react";

function Dropdown({ handleSelect }) {
    const [courses, setCourses] = useState([])

    // add useEffect here for getCourses
    useEffect(() => {
        fetch('http://localhost:4001/getCourses')
            .then(res => res.json())
            .then(data => filterAndSetCourses(data))
    }, [])

    function filterAndSetCourses(courseData) {
        const accessibleCourses = courseData.filter(course => !course.access_restricted_by_date)
        setCourses(accessibleCourses)
    }

    function handleChange(event) {
        handleSelect(event.target.value)
    }

    function renderOption(course) {
        return (
            <option key={course.id} value={course.id}>
                {course.name}
            </option>
        )
    }

    return (
        <select defaultValue="" onChange={handleChange}>
            <option value="" disabled>Select a course</option>
            {courses.map(renderOption)}
        </select>
    )
}

export default Dropdown