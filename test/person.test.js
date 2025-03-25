const { beforeEach } = require("node:test");
const Person = require("../src/person");

describe("Person-Tests", () => {
  let person;

  beforeEach(() => {
    person = new Person();
  });
  test("GivenNewPerson_AllConditionsMet_ReturnsNewPerson", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testPerson = new Person(
      "lastName",
      "firstName",
      "test school",
      "1/1/2024",
      "student_username",
      "affiliation"
    );
    //Assert
    //how do I know that this person was created successefully?
    expect(testPerson.toString()).toBe(
      `Student Name: firstName lastNameSchool: undefinedDOB: Jan 1, 2024Username: student_usernameaffiliation: affiliation`
    );

    /* this.lastName = lastName
    this.firstName = firstName
    this.school = school
    this.dateOfBirth = new Date(dateOfBirth)
    this.userName = userName
    this.affiliation = affiliation */
  });
});
