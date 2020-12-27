export const START_RAD = 100;
export const GRID_SIZE = 12;

export const testUnits = [
  {
    name: "Space Marine Squad",
    models: [
      {
        name: "Space Marine",
        quantity: 8,
        equipment: ["Bolter", "Plasma Grenade"]
      },
      {
        name: "Space Marine Seargent",
        quantity: 1,
        equipment: ["Plasma Gun"]
      }
    ]
  },


  {
    name: "Warlock Skyrunner Coven",
    models: [
      {
        name: "Warlock Skyrunner",
        quantity: 5,
        equipment: ["Skylance", "Shruiken Catapult"],
        size: 40
      }
    ]
  }
];

export const MapActions = {
  INIT_MAP_DATA: "INIT_MAP_DATA",
  MOD_DATA: "MOD_DATA",
  DEL_DATA: "DEL_DATA",
  CTRL_HOVER: "CTRL_HOVER"
};

export const distance = (p1, p2) => Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));

export const P3 = (x=0, y=0, z=0) => (
	{x, y, z}
);

export const P2 = (x=0, y=0) => (
	{x, y}
);
export const D2R = ang => (
	(ang-90) * (Math.PI/180)
);

export const Ang2Vec = (ang, len=1) => (
	P2(Math.cos(D2R(ang)) * len,Math.sin(D2R(ang)) * len)
);

export const inch = 0.2254;
export const decommInch = (inchPos, boardCorner) => [
  boardCorner[0] + (inchPos[0] * inch),
  0.3,
  boardCorner[2] + (inchPos[1] * inch)
];

export const commInch = (threePos, boardCorner) => [
  (threePos[0] - boardCorner[0]) / inch,
  (threePos[2] - boardCorner[2]) / inch
];

export const projTypes = {
  PixelBimetric : {
    xAxis : P2(1 , 0.5) ,
    yAxis :  P2(-1 , 0.5) ,
    zAxis :  P2(0 , -1) ,
    depth :  P3(0.5,0.5,1) , // projections have z as depth      
  },
  PixelTrimetric : {
    xAxis : P2(1 , 0.5) ,
    yAxis :  P2(-0.5 , 1) ,
    zAxis :  P2(0 , -1) ,
    depth :  P3(0.5,1,1) ,
  },
  Isometric : {
    xAxis : Ang2Vec(120) ,
    yAxis : Ang2Vec(-120) ,
    zAxis : Ang2Vec(0) ,
  },
  Bimetric : {
    xAxis : Ang2Vec(116.57) ,
    yAxis : Ang2Vec(-116.57) ,
    zAxis : Ang2Vec(0) ,
  },
  Trimetric : {
    xAxis : Ang2Vec(126.87,2/3) ,
    yAxis : Ang2Vec(-104.04) ,
    zAxis : Ang2Vec(0) ,
  },
  Military : {
    xAxis : Ang2Vec(135) ,
    yAxis : Ang2Vec(-135) ,
    zAxis : Ang2Vec(0) ,
  },
  Cavalier : {
    xAxis : Ang2Vec(135) ,
    yAxis : Ang2Vec(-90) ,
    zAxis : Ang2Vec(0) ,
  },
  TopDown : {
    xAxis : Ang2Vec(180) ,
    yAxis : Ang2Vec(-90) ,
    zAxis : Ang2Vec(0) ,
  },
  Custom : {
    xAxis : Ang2Vec(110) ,
    yAxis : Ang2Vec(-110) ,
    zAxis : Ang2Vec(0) ,
  }
};

const sqrt3 = Math.sqrt(3);

// This is hacky, but efficient - array of indices of touching circles around a central circle
// Calculated by hand using isometric triangles to calculate origin vects
export const ballGridPos = [
  // First layer, 0-5
  [2, 0],
  [1, -sqrt3],
  [-1, -sqrt3],
  [-2, 0],
  [-1, sqrt3],
  [1, sqrt3],

  // Second layer, 6-17
  [4, 0],
  [3, -sqrt3],
  [2, -2*sqrt3],
  [0, -2*sqrt3],
  [-2, -2*sqrt3],
  [-3, -sqrt3],
  [-4, 0],
  [-3, sqrt3],
  [-2, 2*sqrt3],
  [0, 2*sqrt3],
  [2, 2*sqrt3],
  [3, sqrt3],

  // Third layer, 18-35
  [6, 0],
  [5, -sqrt3],
  [4, -2*sqrt3],
  [3, -3*sqrt3],
  [1, -3*sqrt3],
  [-1, -3*sqrt3],
  [-3, -3*sqrt3],
  [-4, -2*sqrt3],
  [-5, -sqrt3],
  [-6, 0],
  [-5, sqrt3],
  [-4, 2*sqrt3],
  [-3, 3*sqrt3],
  [-1, 3*sqrt3],
  [1, 3*sqrt3],
  [3, 3*sqrt3],
  [4, 2*sqrt3],
  [5, sqrt3],
];

export const terrains = {
  // https://d1w82usnq70pt2.cloudfront.net/wp-content/uploads/2019/10/NOVA_Table.png
  NOVA: [
    {
      traits: ["HEAVY"],
      type: "RECTANGLE",
      center: [7.5, 6.5],
      a: -35,
      dim: [7, 5.5]
    },
    {
      traits: ["LIGHT"],
      type: "RECTANGLE",
      center: [36.5, 6.5],
      a: 35,
      dim: [7, 5.5]
    },
    {
      traits: ["LIGHT"],
      type: "RECTANGLE",
      center: [7.5, 23.5],
      a: 35,
      dim: [7, 5.5]
    },
    {
      traits: ["HEAVY"],
      type: "RECTANGLE",
      center: [36.5, 23.5],
      a: -35,
      dim: [7, 5.5]
    },
    {
      traits: ["HEAVY"],
      type: "RECTANGLE",
      center: [13, 15],
      a: 0,
      dim: [7.5, 7.5]
    },
    {
      traits: ["HEAVY"],
      type: "RECTANGLE",
      center: [31, 15],
      a: 0,
      dim: [7.5, 7.5]
    },
    {
      traits: ["LIGHT"],
      type: "ELLIPSE",
      center: [22, 4],
      a: 0,
      dim: [4.5, 2.75]
    },
    {
      traits: ["LIGHT"],
      type: "ELLIPSE",
      center: [22, 26],
      a: 0,
      dim: [4.5, 2.75]
    },
  ]
};