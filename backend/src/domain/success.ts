export class SuccessClass {
  constructor(public message: string) {}
  static new(message: string): SuccessClass {
    return new SuccessClass(message);
  }
  toStr(): string {
    return this.message;
  }
  clientOut() {
    return {
      success: this.message,
    };
  }
}
