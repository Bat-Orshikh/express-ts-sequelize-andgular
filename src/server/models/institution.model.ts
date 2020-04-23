import { Model, DataTypes, Sequelize, Association, ModelCtor } from 'sequelize';
import { Company } from './company.model';

export enum BusinessStatus {
  PREPARING = 0,
  OPEN = 1,
  CLOSED = 2
}

export class Institution extends Model {
  id!: number;
  name!: string;
  companyId!: number;
  prefectureId!: number;
  businessStatus!: BusinessStatus;
  nearestLine!: string | null; // for nullable fields
  nearestStation!: string | null;
  zipCode!: string;
  address!: string;
  building!: string;
  areaId!: number;
  tel!: string;
  outline!: string | null;
  longitude!: number | null;
  latitude!: number | null;
  detailTitle!: string | null;
  detailDescription!: string | null;
  detailImagePath!: string | null;
  topImagePath!: string | null;
  accessGuideMessage!: string | null;
  wayFromTheStation!: string | null;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  readonly company?: Company;
  static associations: {
    company: Association<Institution, Company>;
  };
}

export function initInstitution(sequelize: Sequelize): void {
  Institution.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    companyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "company_id",
      defaultValue: 1
    },
    prefectureId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "prefecture_id",
      defaultValue: 0
    },
    businessStatus: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "business_status",
      defaultValue: 0
    },
    nearestLine: {
      type: DataTypes.STRING,
      field: "nearest_line"
    },
    nearestStation: {
      type: DataTypes.STRING,
      field: "nearest_station"
    },
    zipCode: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "zip_code"
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    building: {
      allowNull: false,
      type: DataTypes.STRING
    },
    areaId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "area_id",
      defaultValue: 0
    },
    tel: {
      allowNull: false,
      type: DataTypes.STRING
    },
    outline: DataTypes.STRING,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    detailTitle: {
      type: DataTypes.STRING,
      field: "detail_title"
    },
    detailDescription: {
      type: DataTypes.STRING,
      field: "detail_description"
    },
    detailImagePath: {
      type: DataTypes.STRING,
      field: "detail_image_path"
    },
    topImagePath: {
      type: DataTypes.STRING,
      field: "top_image_path"
    },
    accessGuideMessage: {
      type: DataTypes.STRING,
      field: "access_guide_message"
    },
    wayFromTheStation: {
      type: DataTypes.STRING,
      field: "way_from_the_station"
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
    tableName: "institutions",
    sequelize: sequelize,
    timestamps: true
  });
}
export function associateInstitution(models: { [key: string]: ModelCtor<Model> }): void {
  Institution.belongsTo(models.Company, {
    foreignKey: "companyId",
    as: "company"
  });
}
