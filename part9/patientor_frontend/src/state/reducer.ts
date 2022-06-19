import { State } from "./state";
import { assertNever, Diagnosis, Patient } from "../types";

interface ActionBase {
	type: string;
}

interface SetPatientAction extends ActionBase {
	type: "SET_PATIENT_LIST";
	payload: Patient[];
}

interface AddPatientAction extends ActionBase {
	type: "ADD_PATIENT";
	payload: Patient;
}

interface SetDiagnosesAction extends ActionBase {
	type: 'SET_DIAGNOSES';
	payload: Diagnosis[];
}

export type Action = SetPatientAction | AddPatientAction | SetDiagnosesAction;

export const setPatientList = (patients: Patient[]): SetPatientAction => ({
	type: "SET_PATIENT_LIST",
	payload: patients
});

export const addPatient = (patient: Patient): AddPatientAction => ({
	type: "ADD_PATIENT",
	payload: patient
});

export const setDiagnoses = (diagnoses: Diagnosis[]): SetDiagnosesAction => ({
	type: 'SET_DIAGNOSES',
	payload: diagnoses
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
	};
	case 'SET_DIAGNOSES':
		return {
			...state,
			diagnoses: action.payload
		};
	default:
		assertNever(action);
		return state;
  }
};
