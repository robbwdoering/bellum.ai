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
