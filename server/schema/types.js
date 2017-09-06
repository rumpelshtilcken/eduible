module.exports = `
schema {
  query:    Root
  mutation: Root
}
type Root {
  user(id: Int!): User
  emails: [Email]
}
type User {
  id: Int!
  email: String
  password: String
  facebookEmail: String
  facebookId: String
  facebookToken: String
  facebookName: String
  createdAt: Int
  updatedAt: Int
}
type Email {
  id: Int!
  email: String
  createdAt: Int
  updatedAt: Int  
}
`;
