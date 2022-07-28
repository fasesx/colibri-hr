enum Candidate {
  ID = "id",
  FirstName = "first_name",
  LastName = "last_name",
  Industry = "industry",
  DateOfBirth = "date_of_birth",
  Email = "email",
  Salary = "salary",
  YearsOfExperience = "years_of_experience"
}

interface ICandidate {
  [Candidate.ID]?: number
  [Candidate.FirstName]?: string
  [Candidate.LastName]?: string
  [Candidate.Industry]?: string
  [Candidate.DateOfBirth]?: string
  [Candidate.Email]?: string
  [Candidate.Salary]?: number
  [Candidate.YearsOfExperience]?: number
}

export {
  Candidate,
  ICandidate,
}