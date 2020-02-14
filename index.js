const Sequelize = require("sequelize");
const { Model, INTEGER, STRING } = Sequelize;
//===========================================
const data = {
  usuario: "postgres",
  clave: 1234,
  baseDatos: "postgres",
  host: "localhost",
  dialect: "postgres"
};

const sequelize = new Sequelize(data.baseDatos, data.usuario, data.clave, {
  // gimme postgres, please!
  dialect: data.dialect,
  host: data.host
});

//===========================================
//CONEXION
sequelize
  .authenticate()
  .then(() => {
    console.log("successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

//===========================================

class Nombre extends Model {}
Nombre.init(
  {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    nombre: STRING,
    cedula: INTEGER
  },
  { sequelize, modelName: "nombre", timestamps: false }
);

//-----------
class Apellido extends Model {}
Apellido.init(
  {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    apellidos: STRING,
    cedula: INTEGER
  },
  { sequelize, modelName: "apellido", timestamps: false }
);

Nombre.hasOne(Apellido);
Apellido.belongsTo(Nombre);

 
/* 
BelongsTo = Pertenece a
HasOne = Tiene uno
HasMany = Tiene muchos
BelongsToMany = Pertenece a muchos

 */

Nombre.findAll({
  include: [
    {
      model: Apellido,
      
    }
  ]
}).then(resul => {
  console.log(resul);
});
