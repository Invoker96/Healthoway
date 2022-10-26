export type User = {
  name: string;
  email: string;
  password: string;
  type: UserType;
};

export enum UserType {
  PATIENT = 'Patient',
  COUNSELLOR = 'Counsellor',
  DOCTOR = 'Doctor',
  MANAGER = 'Manager'
}
