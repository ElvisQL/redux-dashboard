export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  phone: string;
  image: string;
  birthDate: string;
  blocked: boolean;
  address: {
    address: string;
    city: string;
    postalCode: string;
  };
}
