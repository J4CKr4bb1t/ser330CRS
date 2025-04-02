const Instructor = require("../src/instructor");
const Institution = require("../src/institution");
const Person = require("../src/person");
const Student = require("../src/student");
const Course = require("../src/course");
const CourseOffering = require("../src/course-offering");

describe("Institution-Tests", () => {
  let institution;

  beforeEach(() => {
    institution = new Institution();
  });

  //test email
  test("GivenInstitution_AllConditionsMet_ReturnInstitution", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    //Assert
    //can I get their email?
    expect(testInstitution.domain).toBe("qu.edu");
    expect(testInstitution.name).toBe("Quinnipiac University");
  });

  test("GivenInstitution_AddStudent_ReturnStudent", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );
    testInstitution.enroll_student(testStudent);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.studentList.sballerheiligen).toBe(testStudent);
  });

  test("GivenInstitution_ListStudents_ReturnStudent", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );
    testInstitution.enroll_student(testStudent);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.listStudents()["sballerheiligen"]["firstName"]).toBe(
      "SeSe"
    );
  });

  test("GivenInstitution_AddStudentToCourse_ReturnCourse", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );
    testInstitution.enroll_student(testStudent);
    const testCourse = new Course("SER", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2025, "SP");
    testInstitution.add_course(testCourse);
    testInstitution.add_course_offering(testOffering1);

    //this test should succeed, but it's failing
    testInstitution.register_student_for_course(
      testStudent,
      "Quality Assurance",
      "SER",
      330,
      1,
      2025,
      "SP"
    );

    //console.log(testInstitution.studentList);
    //Assert
    expect(testOffering1.get_students().length).toBe(1);
  });

  test("GivenInstitution_AddStudentToCourse_ListStudents", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );
    let testStudent2 = new Student(
      "Allerheiligen",
      "Izy",
      "Bio",
      "05-10-2004",
      "imallerheiligen"
    );
    testInstitution.enroll_student(testStudent);
    const testCourse = new Course("SER", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2025, "SP");

    testInstitution.add_course(testCourse);
    testInstitution.add_course_offering(testOffering1);

    //this test should succeed, but it's failing
    testInstitution.register_student_for_course(
      testStudent,
      "Quality Assurance",
      "SER",
      330,
      1,
      2025,
      "SP"
    );
    testInstitution.register_student_for_course(
      testStudent2,
      "Quality Assurance",
      "SER",
      330,
      1,
      2025,
      "SP"
    );

    //console.log(testInstitution.studentList);
    //Assert
    expect(
      testInstitution.list_registered_students(
        "Quality Assurance",
        "SER",
        330,
        1,
        2025,
        "SP"
      ).length
    ).toBe(1);
  });

  test("GivenInstitution_AddInstructor_ReturnInstructor", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    let sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    testInstitution.hire_instructor(sqaInstructor);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.facultyList).toBe(1);
  });

  test("GivenInstitution_AssignInstructor_ReturnInstructor", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    let sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    testInstitution.add_course(testCourse);
    testInstitution.add_course_offering(testOffering1);

    testInstitution.hire_instructor(sqaInstructor);
    testInstitution.assign_instructor(
      sqaInstructor,
      "Quality Assurance",
      "SER",
      330,
      1,
      2025,
      "SP"
    );

    //console.log(testInstitution.studentList);
    //Assert
    expect(testOffering1).toBe(sqaInstructor);
  });

  test("GivenInstitution_AddCourse_ReturnCourseList", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    testInstitution.add_course(testCourse);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.courseCatalog[testCourse.name]).toBe(testCourse);
  });

  test("GivenInstitution_AddCourse_ReturnCourseList", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    testInstitution.add_course(testCourse);

    const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    testInstitution.add_course_offering(testOffering1);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.courseSchedule[testCourse.name].toString()).toBe(
      "Quality Assurance, Engineering 330-1 (FA 2024)"
    );
  });
  test("GivenInstitution_AddCourseTwice_ReturnError", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    testInstitution.add_course(testCourse);

    // const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    // testInstitution.add_course_offering(testOffering1);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.add_course(testCourse)).toBe(
      "Course has already been added"
    );
  });

  test("GivenInstitution_AddInvalidCourse_ReturnError", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    // const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    // testInstitution.add_course(testCourse);

    // const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    // testInstitution.add_course_offering(testOffering1);

    //console.log(testInstitution.studentList);
    //Assert
    // expect(testInstitution.add_course("banana")).toBe(
    //   "Only accepts course object as argument"
    // );
    expect(() => testInstitution.add_course("banana")).toThrowError(TypeError);
  });
  test("GivenInstitution_AddInvalidCourseOffering_ReturnError", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    testInstitution.add_course(testCourse);

    // const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    // testInstitution.add_course_offering(testOffering1);

    //console.log(testInstitution.studentList);
    //Assert
    // expect(testInstitution.add_course("banana")).toBe(
    //   "Only accepts course object as argument"
    // );
    expect(() => testInstitution.add_course_offering("banana")).toThrowError(
      TypeError
    );
  });

  test("GivenInstitution_AddInvalidCourseOffering_ReturnError", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    // testInstitution.add_course(testCourse);

    const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    testInstitution.add_course_offering(testOffering1);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.add_course_offering(testOffering1)).toBe(
      "Please create a course before creating course offering"
    );
    // expect(() => testInstitution.add_course_offering(test)).toThrowError(
    //   TypeError
    // );
  });

  //bulk of Institution Methods are console Logs... they all return null. How to test them?

  test("GivenInstitution_AddInvalidCourseOffering_ReturnError", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    testInstitution.add_course(testCourse);

    const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    testInstitution.add_course_offering(testOffering1);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.courseCatalog["Quality Assurance"].name).toBe(
      "Quality Assurance"
    );
    // expect(() => testInstitution.add_course_offering(test)).toThrowError(
    //   TypeError
    // );
  });

  test("GivenInstitution_ListInstructors_ReturnError", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    let sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    testInstitution.hire_instructor(sqaInstructor);

    //console.log(testInstitution.studentList);
    //Assert
    expect(testInstitution.list_instructors()["dnicolini"]["lastName"]).toBe(
      "Nicolini"
    );
    // expect(() => testInstitution.add_course_offering(test)).toThrowError(
    //   TypeError
    // );
  });

  test("GivenInstitution_ListCourses_ReturnCourseList", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    testInstitution.add_course(testCourse);

    //console.log(testInstitution.studentList);
    //Assert
    expect(
      testInstitution.list_course_catalog()["Quality Assurance"]["name"]
    ).toBe("Quality Assurance");
  });

  test("GivenInstitution_ListCourseOfferings_ReturnCourseList", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("SER", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2025, "SP");
    testInstitution.add_course(testCourse);
    testInstitution.add_course_offering(testOffering1);

    //console.log(testInstitution.studentList);
    //Assert
    expect(
      testInstitution.list_course_schedule()["Quality Assurance"].length
    ).toBe(1);
  });

  test("GivenInstitution_ListCourseOfferingsDeptFilter_ReturnCourseList", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testCourse = new Course("SER", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2025, "SP");
    const testCourse2 = new Course("EN", 330, "Introduction to writng", 3);
    let testOffering2 = new CourseOffering(testCourse2, 1, 2025, "SP");
    testInstitution.add_course(testCourse);
    testInstitution.add_course(testCourse2);

    testInstitution.add_course_offering(testOffering1);
    testInstitution.add_course_offering(testOffering2);

    //console.log(testInstitution.studentList);
    //Assert
    expect(
      testInstitution.list_course_schedule(null, null, "SER")[
        "Quality Assurance"
      ].length
    ).toBe(1);
  });
});
