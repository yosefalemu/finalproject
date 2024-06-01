/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    ordinaryUser: OrdinaryUser;
    applications: Application;
    ordinaryNotification: OrdinaryNotification;
    agents: Agent;
    employee: Employee;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  sex: 'male' | 'female';
  role: 'screener' | 'manager' | 'admin';
  dateOfBirth: string;
  profile?: string | null;
  city: string;
  woreda: string;
  kebele: string;
  manager?: (string | null) | User;
  permission: 'allowed' | 'rejected';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ordinaryUser".
 */
export interface OrdinaryUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  dateOfBirth: string;
  profile?: string | null;
  city: string;
  woreda: string;
  kebele: string;
  nationalIdVerified: 'pending' | 'approved' | 'denied';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "applications".
 */
export interface Application {
  id: string;
  applier: string | OrdinaryUser;
  agentName: string;
  age: string;
  sex: string;
  houseNumber: string;
  agentLogoUrl: string;
  statusAgentLogoUrl?: ('pending' | 'approved' | 'rejected') | null;
  agentLogoRejectionReason?: string | null;
  profileUrl: string;
  statusProfileUrl?: ('pending' | 'approved' | 'rejected') | null;
  profilePictureRejectionReason?: string | null;
  nationalIdUrls: string;
  statusNationalIdUrl?: ('pending' | 'approved' | 'rejected') | null;
  nationalIdRejectionReason?: string | null;
  medicalUrls: string;
  statusMedicalUrl?: ('pending' | 'approved' | 'rejected') | null;
  medicalFilesRejectionReason?: string | null;
  educationalUrls: string;
  statusEducationalUrl?: ('pending' | 'approved' | 'rejected') | null;
  educationalFilesRejectionReason?: string | null;
  uniformDetailsUrls: string;
  statusUniformDetailUrl?: ('pending' | 'approved' | 'rejected') | null;
  uniformDetailRejectionReason?: string | null;
  employeeIdUrls: string;
  statusEmployeeIdUrl?: ('pending' | 'approved' | 'rejected') | null;
  employeeIdRejectionReason?: string | null;
  responseOfScreener?: ('pending' | 'approved' | 'rejected') | null;
  responseOfManager?: ('pending' | 'approved' | 'rejected') | null;
  selectedScreener: string | User;
  selectedManager: string | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ordinaryNotification".
 */
export interface OrdinaryNotification {
  id: string;
  reciever: string | OrdinaryUser;
  sender: string | User;
  application: string | Application;
  message: string;
  isViewed?: ('unseen' | 'seen') | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "agents".
 */
export interface Agent {
  id: string;
  agentAdmin: string | OrdinaryUser;
  randomPassword: string;
  application: string | Application;
  permission?: ('pending' | 'allowed' | 'rejected') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "employee".
 */
export interface Employee {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  age: string;
  educationLevel: string;
  nationalId: string;
  phoneNumber: string;
  dateOfEmployement: string;
  forensicRecordsUrls: string;
  medicalExaminationUrls: string;
  regionofemployment: string;
  cityofemployment: string;
  specificplaceofemployment: string;
  employmentposition: string;
  region: string;
  zone: string;
  woreda: string;
  kebele: string;
  houseNumber: string;
  martialStatus: string;
  getCoughtFirstName: string;
  getCoughtMiddleName: string;
  getCoughtLastName: string;
  getCoughtRegion: string;
  getCoughtZone: string;
  getCoughtKebele: string;
  getCoughtHouseNumber: string;
  getCoughtNationalId: string;
  getCoughtPhoneNumber: string;
  status?: ('employeed' | 'free') | null;
  activeAgent?: (string | null) | Agent;
  prevAgents: (string | Agent)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'ordinaryUser';
        value: string | OrdinaryUser;
      }
    | {
        relationTo: 'agents';
        value: string | Agent;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}