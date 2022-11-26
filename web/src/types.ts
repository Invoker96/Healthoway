export type User = {
  fullName: string;
  email: string;
  password: string;
  userRole: RoleType;
  dob: string;
  pNum: string;
  username: string;
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

export type AssessmentForm = {
  username: string;
  email: string;
  ques1: string;
  ques2: string;
  ques3: string;
  ques4: string;
  ques5: string;
  ques6: string;
  ques7: string;
  ques8: string;
  ques9: string;
};
