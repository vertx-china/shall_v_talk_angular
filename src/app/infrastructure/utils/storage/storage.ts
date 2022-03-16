class LocalStorage {
  private prefix: string;

  constructor(prefix: string = 'web') {
    this.prefix = prefix;
  }

  public getItem(key: string) {
    key = this.getKey(key);
    const storeData: string | null = window.localStorage.getItem(key);
    if (storeData) {
      const {
        value,
        options: {storeTime},
      } = JSON.parse(storeData);
      if (storeTime > new Date().getTime()) {
        return value;
      } else {
        this.removeItem(key);
        return null;
      }
    }
    return null;
  }

  public setItem(key: string, value: string, time?: any): void {
    key = this.getKey(key);
    try {
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 1;
    }
    const options: { [propsName: string]: any } = {
      storeTime: time,
      prefix: this.prefix,
    };
    window.localStorage.setItem(key, JSON.stringify({value, options}));
  }

  public removeItem(key: string): void {
    key = this.getKey(key);
    window.localStorage.removeItem(key);
  }

  public clear(): void {
    window.localStorage.clear();
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }
}

export const storage = new LocalStorage('sea');
