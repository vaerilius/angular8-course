export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, desc: string, image: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = image;
  }
}
