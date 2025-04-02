const { beforeEach } = require("node:test");
const Person = require("../src/person");
const Institution = require("../src/institution");

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
    expect(testPerson.lastName.toString()).toBe("lastName");
    expect(testPerson.firstName.toString()).toBe("firstName");
    expect(testPerson.school.toString()).toBe("test school");
    expect(testPerson.dateOfBirth.toISOString()).toBe(
      "2024-01-01T05:00:00.000Z"
    );
    expect(testPerson.userName.toString()).toBe("student_username");
    expect(testPerson.affiliation.toString()).toBe("affiliation");

    // expect(testPerson.toString()).toBe(
    //   `Student Name: firstName lastNameSchool: undefinedDOB: Jan 1, 2024Username: student_usernameaffiliation: affiliation`
    // );

    /* this.lastName = lastName
    this.firstName = firstName
    this.school = school
    this.dateOfBirth = new Date(dateOfBirth)
    this.userName = userName
    this.affiliation = affiliation */
  });

  //test email
  test("GivenPerson_AllConditionsMet_ReadEmail", () => {
    //Arrange
    //beforeEach
    //Act
    //what we're trying to do
    const testInstitution = new Institution("Quinnipiac University", "qu.edu");

    const testPerson = new Person(
      "lastName",
      "firstName",
      testInstitution,
      "1/1/2024",
      "student_username",
      "affiliation"
    );

    //Assert
    //can I get their email?
    expect(testPerson.email.toString()).toBe("student_username@qu.edu");
  });
});
