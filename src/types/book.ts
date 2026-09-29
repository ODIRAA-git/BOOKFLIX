export interface Book {
  image: string;
  title: string;
  prologue: string;
  rating: number;
}

export interface BookRow {
  title: string;
  books: Book[];
}
