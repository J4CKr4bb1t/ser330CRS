const Instructor = require("../src/instructor");
const Institution = require("../src/institution");
const Person = require("../src/person");
const Course = require("../src/course");
const CourseOffering = require("../src/course-offering");

describe("Instructor-Tests", () => {
  let instructor;
  // This will run before each test case
  // Initialize a new calculator instance
  beforeEach(() => {
    instructor = new Instructor();
  });

  test("GivenAValidInstructor_AllConditionsMet_HiresANewInstructor", () => {
    // Arrange
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    const sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    // Act
    testInstitution.hire_instructor(sqaInstructor);

    // Assert
    // Using the Object.Keys function we can extract an array of the keys for the
    // faculty dictionary.
    // This allows us to verify that there is 1 and only 1 value in the faculty list
    expect(Object.keys(testInstitution.facultyList).length).toBe(1);

    // Another option to verify that the value matching the dictionary
    // is equal
    // The behavior you are validating here is that the method adds the right person
    expect(Object.keys(testInstitution.facultyList)).toStrictEqual([
      "dnicolini",
    ]);
  });

  test("GivenAValidInstructor_VerifiesDuplicateInstructor_DoesNotAddDuplicate", () => {
    // Arrange
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    const sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    // Act
    testInstitution.hire_instructor(sqaInstructor);

    // This behavior is a bit sneaky because it simply logs the error and doesn't throw an error
    // or report the behavior
    //  You generally cant assert against log statements - so our test expectations are the same
    //
    //testInstitution.hire_instructor(sqaInstructor);

    // Assert
    // Using the Object.Keys function we can extract an array of the keys for the
    // faculty dictionary.
    // This allows us to verify that there is 1 and only 1 value in the faculty list
    expect(Object.keys(testInstitution.facultyList).length).toBe(1);

    // Another option to verify that the value matching the dictionary
    // is equal
    // The behavior you are validating here is that the method adds the right person
    expect(Object.keys(testInstitution.facultyList)).toStrictEqual([
      "dnicolini",
    ]);
  });

  test("GivenAnInvalidInstructory_AttemptsToHireInstructor_ThrowsError", () => {
    // Arrange
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let testPerson = new Person(
      "lastName",
      "firstName",
      "test school",
      "1/1/2024",
      "student_username",
      "affiliation"
    );

    // Combines the act and assertion to validate the error was thrown
    expect(() => testInstitution.hire_instructor(testPerson)).toThrowError(
      TypeError
    );
  });

  test("GivenValidInstructor_AttemptsRetrieveUsername_ReturnsEmail", () => {
    //arrange

    //Act
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    const sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    //Assure
    //console.log(sqaInstructor.email);

    expect(sqaInstructor.email).toBe("dnicolini@qu.edu");
  });

  test("GivenValidInstructor_AttemptsViewEmptyCourses_ReturnsCourse", () => {
    //arrange

    //Act
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    sqaInstructor.course_list = ["EN 101", "MA 105"];
    //Assure
    //console.log(sqaInstructor.course_list);

    expect(sqaInstructor.course_list.toString()).toBe("EN 101,MA 105");
  });

  test("GivenValidInstructor_AttemptSetCourse_ReturnsCourseList", () => {
    //arrange
    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    const testOffering1 = new CourseOffering(testCourse, 1, 2024, "SP");
    const testOffering2 = new CourseOffering(testCourse, 1, 2025, "SP");

    //Act
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    sqaInstructor.course_list = [testOffering1, testOffering2];
    //Assure
    //console.log(sqaInstructor.course_list);

    expect(sqaInstructor.course_list.toString()).toBe(
      "Quality Assurance, Engineering 330-1 (SP 2024),Quality Assurance, Engineering 330-1 (SP 2025)"
    );
  });
  test("GivenValidInstructor_AttemptCourseList_ReturnsFilteredCourseList", () => {
    //arrange
    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    const testOffering2 = new CourseOffering(testCourse, 1, 2025, "SP");

    //Act
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");
    let sqaInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );

    sqaInstructor.course_list = [testOffering1, testOffering2];
    //Assure
    //console.log(sqaInstructor.course_list);

    expect(sqaInstructor.list_courses(2025, null).toString()).toBe(
      "Quality Assurance, Engineering 330-1 (SP 2025)"
    );
    expect(sqaInstructor.list_courses(null, "FA").toString()).toBe(
      "Quality Assurance, Engineering 330-1 (FA 2024)"
    );
    expect(sqaInstructor.list_courses(2025, "FA").toString()).toBe("");
    expect(sqaInstructor.list_courses(null, null).toString()).toBe(
      "Quality Assurance, Engineering 330-1 (FA 2024),Quality Assurance, Engineering 330-1 (SP 2025)"
    );
  });
});
