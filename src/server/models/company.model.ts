import { Model, DataTypes, Sequelize, Association, ModelCtor } from 'sequelize';
import { Institution } from './institution.model';

export class Company extends Model {
  id!: number;
  name!: string;
  shortName!: string | null;
  address!: string | null;
  telephoneNumber!: string | null;
  emailAddress!: string | null;
  description!: string | null;
  isValid!: boolean;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  readonly institutions?: Institution[];
  static associations: {
    institutions: Association<Company, Institution>;
  };
}
export function initCompany(sequelize: Sequelize): void {
  Company.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    shortName: {
      allowNull: true,
      type: DataTypes.STRING,
      field: "short_name"
    },
    address: {
      type: DataTypes.STRING
    },
    telephoneNumber: {
      type: DataTypes.STRING,
      field: "telephone_number"
    },
    emailAddress: {
      type: DataTypes.STRING,
      field: "email_address"
    },
    description: {
      type: DataTypes.STRING
    },
    isValid: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "is_valid",
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at"
    }
  }, {
    tableName: "companies",
    sequelize: sequelize,
    timestamps: true
  });
}
export function associateCompany(models: { [key: string]: ModelCtor<Model> }): void {
  Company.hasMany(models.Institution, {
    sourceKey: "id",
    foreignKey: "companyId",
    as: "institutions"
  });
}