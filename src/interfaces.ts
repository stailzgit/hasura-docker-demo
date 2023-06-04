export interface Sneakers {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

export interface Items {
  items: Sneakers[];
}
