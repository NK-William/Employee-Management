import {ISkill} from './skill';

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  emailAddress: string;
  dateOfBirth?: Date;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  skills: ISkill[];
}
