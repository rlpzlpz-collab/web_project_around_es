export interface CardFormData {
  name: string;
  link: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface UserFormData {
  name: string;
  about: string;
}

export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}