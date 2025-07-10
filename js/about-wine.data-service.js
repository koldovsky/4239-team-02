class DataService {
  constructor(url) {
    this.url = url;
    this.data = null;
  }
  //
  async load() {
    if (this.data) return;
    const res = await fetch(this.url);
    this.data = await res.json();
    this.getAllData();
  }

  getAllData() {
    return this.data;
  }

  getItemById(id) {
    return this.data.find((item) => item.id === id); // знайти товар за ID
  }
}

export { DataService };
