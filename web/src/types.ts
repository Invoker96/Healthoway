export type User = {
  fullName: string;
  email: string;
  password: string;
  userRole: RoleType;
  dob: string;
  pNum: string;
};

export enum RoleType {
  PATIENT = 'Patient',
  COUNSELLOR = 'Counsellor',
  DOCTOR = 'Doctor',
  MANAGER = 'Manager'
}

export type Auth = {
  email: string;
  password: string;
};
