export class Entity {

  public id: string;

  constructor(id?: string) {
    this.id = id;
  }

  public beginDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('begin drawing');
      resolve();
    });
  }

  public endDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('end drawing');
      resolve();
    });
  }
}
