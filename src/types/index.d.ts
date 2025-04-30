declare type DogStatus = 'available' | 'pending' | 'adopted';

declare type Dog = {
  id: number;
  name: string;
  mainImage: string;
  moreImages: string[];
  status: DogStatus;
  gender: 'male' | 'female'
};