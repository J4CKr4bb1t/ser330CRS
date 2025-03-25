const { beforeEach } = require("node:test");
const Instructor = require("../src/instructor");
const Institution = require("../src/institution");

describe("Instructor-Tests", () => {
  let instructor;
  let institution;

  beforeEach(() => {
    instructor = new Instructor();
  });
  test("GivenValidInstructor_AllConditionsMet_HiresNewInstructor", () => {
    //Arrange
    //beforeEach
    let testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testInstructor = new Instructor(
      "Nicolini",
      "Dylan",
      testInstitution,
      "1/1/2024",
      "dnicolini"
    );
    //Act
    //what we're trying to do
    testInstitution.hire_instructor(testInstructor);
    //Assert
    //how do I know that this person was created successefully?
    console.log(testInstitution.list_instructors());
    expect(testInstitution.list_instructors()).toBe("Nicolini, Dylan");
  });
});
