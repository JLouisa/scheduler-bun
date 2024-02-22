import { NIL as NIL_UUID } from "uuid";

export class AdminClass {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public active: boolean
  ) {}
  // Create a new instance of the class after validation
  static new(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    active: boolean
  ): AdminClass {
    return new AdminClass(
      NIL_UUID,
      firstName,
      lastName,
      email,
      password,
      active
    );
  }
  static login(email: string, password: string): AdminClass {
    return new AdminClass(NIL_UUID, "", "", email, password, true);
  }
  // Create a new instance of the class from DB for logic work
  create(): AdminClass {
    return new AdminClass(
      this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.active
    );
  }
  // Create a new instance of the class for database insertion
  db(): AdminClass {
    return new AdminClass(
      this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.active
    );
  }
}
