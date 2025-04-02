const Student = require("../src/student");
const Institution = require("../src/institution");
const Course = require("../src/course");
const CourseOffering = require("../src/course-offering");

describe("Student-Tests", () => {
  let student;

  beforeEach(() => {
    //Arrange
    student = new Student();
  });
  test("GivenNewStudent_AllConditionsMet_ReturnsNewStudent", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );
    //Assert
    //how do I know that this person was created successefully?
    expect(testStudent.lastName.toString()).toBe("Allerheiligen");
    expect(testStudent.firstName.toString()).toBe("SeSe");
    expect(testStudent.school.toString()).toBe("Engineering");

    expect(testStudent.userName.toString()).toBe("sballerheiligen");
  });

  test("GivenNewStudent_AllConditionsMet_ReturnsNewStudentString", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );
    //Assert
    //how do I know that this person was created successefully?
    //console.log(testStudent.toString());
    expect(testStudent.toString()).toBe(`
Student Name: SeSe Allerheiligen
School: undefined
DOB: May 10, 2004
Username: sballerheiligen
Email: sballerheiligen@undefined
GPA: 0
Credits: 0
`);
  });

  test("GivenNewStudent_AssignCourse_ReturnsCredits", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    const testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");

    testStudent.courseList = [testOffering1];
    //Assert
    //how do I know that this student was created successefully?
    expect(testStudent.credits).toBe(3);
  });

  test("GivenStudentInCourse_AssignGrade_ReturnsCourseList", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    testStudent.courseList = [testOffering1];

    //Assert
    //how do I know that this student was created successefully?
    expect(testStudent.list_courses().toString()).toBe(
      "Quality Assurance, Engineering 330-1 (FA 2024)"
    );
    expect(testStudent.courseList[0].toString()).toBe(
      "Quality Assurance, Engineering 330-1 (FA 2024)"
    );
  });

  test("GivenStudentInCourse_AssignGrade_ReturnsGrade", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    testOffering1.register_students([testStudent]);
    testOffering1.submit_grade(testStudent, "A");
    testStudent.courseList = [testOffering1];

    // console.log(testOffering1.get_students());
    // console.log(testOffering1.get_grade(testStudent));

    //Assert
    //how do I know that this student was created successefully?
    expect(testStudent.gpa).toBe(4.0); //recieves 0
  });

  test("GivenStudentInCourses_AssignGrade_ReturnsAllCourses", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    let testStudent = new Student(
      "Allerheiligen",
      "SeSe",
      "Engineering",
      "05-10-2004",
      "sballerheiligen"
    );

    const testCourse = new Course("Engineering", 330, "Quality Assurance", 3);
    let testOffering1 = new CourseOffering(testCourse, 1, 2024, "FA");
    const testCourse2 = new Course("CAS", 101, "English", 3);
    let testOffering2 = new CourseOffering(testCourse2, 2, 2024, "FA");
    const testCourse3 = new Course("FLW", 210, "Ballroom Dancing", 1);
    let testOffering3 = new CourseOffering(testCourse3, 1, 2024, "FA");
    testStudent.courseList = [testOffering1, testOffering2, testOffering3];

    testOffering1.submit_grade(testStudent, "A");
    testOffering2.submit_grade(testStudent, "A");
    testOffering3.submit_grade(testStudent, "A");

    testStudent.courseList = [testOffering1, testOffering2, testOffering3];

    // console.log(testOffering1.get_students());
    // console.log(testOffering1.get_grade(testStudent));

    //Assert
    //how do I know that this student was created successefully?
    expect(testStudent.credits).toBe(7); //recieves 0
    // expect(testStudent.transcript).toBe(
    //   `{"Ballroom Dancing, FLW 210-1 (FA 2024)": "A", "English, CAS 101-2 (FA 2024)": "A", "Quality Assurance, Engineering 330-1 (FA 2024)": "A"}`
    // ); //recieves 0

    expect(testStudent.list_courses()[0]).toBe(
      "Quality Assurance, Engineering 330-1 (FA 2024)"
    );
    expect(testStudent.list_courses()[1]).toBe("English, CAS 101-2 (FA 2024)");
    expect(testStudent.list_courses()[2]).toBe(
      "Ballroom Dancing, FLW 210-1 (FA 2024)"
    );
  });
});
