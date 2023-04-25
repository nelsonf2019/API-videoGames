const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
      id: {
          type:DataTypes.UUID,
          defaultValue:DataTypes.UUIDV4,
          allowNull:false,
          primaryKey:true,
      },
      name: {
          type:DataTypes.STRING,
          unique:true, 
          allowNull:false, 
      },
      description: {
          type:DataTypes.STRING,
          allowNull:false, 
      },
      plataforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {  
          type:DataTypes.STRING,
          allowNull:false, 
      },
      released: {
          type:DataTypes.DATEONLY,
          allowNull:false, 
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0.0,
          max: 5.0,
        },
        defaultValue: 0.0,
      },
      created: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true,
      },
  },
  {  //esto es para que no me aparezca createdAt y  updatedAt en la tabla Charactares
      timestamps: false,
  }
  );
};
