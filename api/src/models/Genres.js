const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
      id: {
          type:DataTypes.UUID,
          primaryKey:true,
          defaultValue:DataTypes.UUIDV4
      },
      name: {
          type:DataTypes.STRING,
          unique:true, 
          allowNull:false, 
      }
  },
  {  //esto es para que no me aparezca createdAt y  updatedAt en la tabla Charactares
      timestamps: false,
  }
  );
};

