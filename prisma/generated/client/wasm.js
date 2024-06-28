
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.13.0
 * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
 */
Prisma.prismaVersion = {
  client: "5.13.0",
  engine: "b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  roleId: 'roleId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  roleId: 'roleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type'
};

exports.Prisma.ServiceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  slug: 'slug',
  image: 'image',
  icon: 'icon',
  onSection: 'onSection',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceListScalarFieldEnum = {
  id: 'id',
  name: 'name',
  order: 'order',
  serviceId: 'serviceId'
};

exports.Prisma.ServiceCategoryScalarFieldEnum = {
  serviceId: 'serviceId',
  categoryId: 'categoryId'
};

exports.Prisma.PartnerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PartnerCategoryScalarFieldEnum = {
  partnerId: 'partnerId',
  categoryId: 'categoryId'
};

exports.Prisma.ClientScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClientCategoryScalarFieldEnum = {
  clientId: 'clientId',
  categoryId: 'categoryId'
};

exports.Prisma.NewsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  image: 'image',
  userId: 'userId',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NewsCategoryScalarFieldEnum = {
  newsId: 'newsId',
  categoryId: 'categoryId'
};

exports.Prisma.EventCategoryScalarFieldEnum = {
  eventId: 'eventId',
  categoryId: 'categoryId'
};

exports.Prisma.PortofolioScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  imageUrl: 'imageUrl'
};

exports.Prisma.CarouselScalarFieldEnum = {
  id: 'id',
  title: 'title',
  image: 'image',
  status: 'status'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  name: 'name',
  position: 'position',
  order: 'order',
  image: 'image',
  twitter: 'twitter',
  facebook: 'facebook',
  email: 'email',
  linkedin: 'linkedin'
};

exports.Prisma.ServicePageScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  image: 'image',
  direction: 'direction',
  head: 'head'
};

exports.Prisma.AboutPageScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  image: 'image',
  direction: 'direction',
  head: 'head'
};

exports.Prisma.NewsPageScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description'
};

exports.Prisma.FeatureScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description'
};

exports.Prisma.CareerScalarFieldEnum = {
  id: 'id',
  position: 'position',
  description: 'description',
  requirement: 'requirement',
  responsibility: 'responsibility',
  benefit: 'benefit',
  howToApply: 'howToApply',
  type: 'type',
  model: 'model',
  active: 'active',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApplicationScalarFieldEnum = {
  id: 'id',
  fullname: 'fullname',
  gender: 'gender',
  placeBirth: 'placeBirth',
  dateBirth: 'dateBirth',
  religion: 'religion',
  province: 'province',
  regency: 'regency',
  district: 'district',
  village: 'village',
  address: 'address',
  formalEducation: 'formalEducation',
  institution: 'institution',
  faculty: 'faculty',
  major: 'major',
  gpa: 'gpa',
  marital: 'marital',
  email: 'email',
  idCard: 'idCard',
  phoneNumber: 'phoneNumber',
  company: 'company',
  companyCity: 'companyCity',
  lengthWork: 'lengthWork',
  position: 'position',
  reasonLeaving: 'reasonLeaving',
  careerId: 'careerId',
  resume: 'resume',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.CategoryTypes = exports.$Enums.CategoryTypes = {
  SERVICE: 'SERVICE',
  PARTNER: 'PARTNER',
  CLIENT: 'CLIENT',
  NEWS: 'NEWS',
  EVENT: 'EVENT'
};

exports.NewsTypes = exports.$Enums.NewsTypes = {
  NEWS: 'NEWS',
  EVENT: 'EVENT'
};

exports.JobType = exports.$Enums.JobType = {
  FULLTIME: 'FULLTIME',
  PARTTIME: 'PARTTIME',
  INTERN: 'INTERN'
};

exports.JobModel = exports.$Enums.JobModel = {
  WFO: 'WFO',
  WFH: 'WFH',
  HYBRID: 'HYBRID'
};

exports.Prisma.ModelName = {
  Role: 'Role',
  Permission: 'Permission',
  User: 'User',
  Session: 'Session',
  Category: 'Category',
  Service: 'Service',
  ServiceList: 'ServiceList',
  ServiceCategory: 'ServiceCategory',
  Partner: 'Partner',
  PartnerCategory: 'PartnerCategory',
  Client: 'Client',
  ClientCategory: 'ClientCategory',
  News: 'News',
  NewsCategory: 'NewsCategory',
  EventCategory: 'EventCategory',
  Portofolio: 'Portofolio',
  Carousel: 'Carousel',
  Team: 'Team',
  ServicePage: 'ServicePage',
  AboutPage: 'AboutPage',
  NewsPage: 'NewsPage',
  Question: 'Question',
  Feature: 'Feature',
  Career: 'Career',
  Application: 'Application'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
