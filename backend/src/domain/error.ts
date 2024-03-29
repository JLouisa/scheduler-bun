export class ErrorClass {
  constructor(public message: string) {}
  static new(message: string): ErrorClass {
    return new ErrorClass(message);
  }
  toStr(): string {
    return this.message;
  }
  clientOut() {
    return {
      error: this.message,
    };
  }
}
