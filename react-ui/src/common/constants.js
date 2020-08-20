//  ---------------------------
//  ------- START PANES -------
//  ---------------------------
export const Panes = {
	AddEvent: "ADD_EVENT",
	Regulations: "REGULATIONS",
	PlanContact: "PLAN_CONTACT",
	Calculator: "CALCULATOR",
	ListManager: "LIST_MANAGER",
	UnitDeck: "UNIT_DECK",
	ArmyDetails: "ARMY_DETAILS"
}

//  ---------------------------
//  ------ START CANVASES -----
//  ---------------------------
export const Canvases = {
	HexMap:"HEX_MAP"
}

export const initialPaneConfigs = {
	[Panes.AddEvent]: {size: 'medium'},
	[Panes.Regulations]: {size: 'medium'},
	[Panes.PlanContact]: {size: 'medium'},
	[Panes.ListManager]: {size: 'small', headerItems: "Lists"},
	[Panes.UnitDeck]: {size: 'small right_sidebar', headerItems: "Units"},
	[Panes.ArmyDetails]: {size: 'small', headerItems: "Army Details"}
}

export const eventTypeOptions = [
	{text: "Test", value: "test"},
	{text: "Contact", value: "contact"},
	{text: "Gathering", value: "gathering"},
	{text: "Symptom", value: "symptom"}
];

export const eventTestSubtypeOptions = [
	{text: "I took a test", value: "taken"},
	{text: "I got results", value: "results"}
];

export const eventTypeIconMap = {
	test: 'lab',
	contact: 'handshake outline',
	gathering: 'group',
	symptom:  'thermometer half'
};

export const locationOptions = [
	{ text: 'Alabama', value: 'Alabama' },
	{ text: 'Alaska', value: 'Alaska' },
	{ text: 'Arizona', value: 'Arizona' },
	{ text: 'Arkansas', value: 'Arkansas' },
	{ text: 'California', value: 'California' },
	{ text: 'Colorado', value: 'Colorado' },
	{ text: 'Connecticut', value: 'Connecticut' },
	{ text: 'Delaware', value: 'Delaware' },
	{ text: 'District of Columbia', value: 'District of Columbia' },
	{ text: 'Florida', value: 'Florida' },
	{ text: 'Georgia', value: 'Georgia' },
	{ text: 'Guam', value: 'Guam' },
	{ text: 'Hawaii', value: 'Hawaii' },
	{ text: 'Idaho', value: 'Idaho' },
	{ text: 'Illinois', value: 'Illinois' },
	{ text: 'Indiana', value: 'Indiana' },
	{ text: 'Iowa', value: 'Iowa' },
	{ text: 'Kansas', value: 'Kansas' },
	{ text: 'Kentucky', value: 'Kentucky' },
	{ text: 'Louisiana', value: 'Louisiana' },
	{ text: 'Maine', value: 'Maine' },
	{ text: 'Maryland', value: 'Maryland' },
	{ text: 'Massachusetts', value: 'Massachusetts' },
	{ text: 'Michigan', value: 'Michigan' },
	{ text: 'Minnesota', value: 'Minnesota' },
	{ text: 'Mississippi', value: 'Mississippi' },
	{ text: 'Missouri', value: 'Missouri' },
	{ text: 'Montana', value: 'Montana' },
	{ text: 'Nebraska', value: 'Nebraska' },
	{ text: 'Nevada', value: 'Nevada' },
	{ text: 'New Hampshire', value: 'New Hampshire' },
	{ text: 'New Jersey', value: 'New Jersey' },
	{ text: 'New Mexico', value: 'New Mexico' },
	{ text: 'New York', value: 'New York' },
	{ text: 'North Carolina', value: 'North Carolina' },
	{ text: 'North Dakota', value: 'North Dakota' },
	{ text: 'Ohio', value: 'Ohio' },
	{ text: 'Oklahoma', value: 'Oklahoma' },
	{ text: 'Oregon', value: 'Oregon' },
	{ text: 'Pennsylvania', value: 'Pennsylvania' },
	{ text: 'Rhode Island', value: 'Rhode Island' },
	{ text: 'Puerto Rico', value: 'Puerto Rico' },
	{ text: 'South Carolina', value: 'South Carolina' },
	{ text: 'South Dakota', value: 'South Dakota' },
	{ text: 'Tennessee', value: 'Tennessee' },
	{ text: 'Texas', value: 'Texas' },
	{ text: 'Utah', value: 'Utah' },
	{ text: 'Vermont', value: 'Vermont' },
	{ text: 'Virginia', value: 'Virginia' },
	{ text: 'Washington', value: 'Washington' },
	{ text: 'West Virginia', value: 'West Virginia' },
	{ text: 'Wisconsin', value: 'Wisconsin' },
	{ text: 'Wyoming', value: 'Wyoming' }
];

export const eventSocDistOptions = [
	{ text: 'No', value: 0},
	{ text: 'A bit', value: 1},
	{ text: 'Mostly', value: 2},
	{ text: 'Strictly', value: 3},
];