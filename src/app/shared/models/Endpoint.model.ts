interface API {
  openapi: string;
  info: Info;
  servers: Server[];
  paths: Paths;
  components: Components;
}

interface Components {
  schemas: Schemas;
}

interface Schemas {
  Role: Role;
  User: User;
  UserProfile: UserProfile;
  Route: Route;
  Jwt: Jwt;
}

interface Jwt {
  type: string;
  properties: Properties5;
}

interface Properties5 {
  jwt: Schema4;
}

interface Route {
  type: string;
  properties: Properties4;
}

interface Properties4 {
  id: Schema;
  path: Schema4;
  secure: Schema4;
  roles: Schema5;
}

interface UserProfile {
  type: string;
  properties: Properties3;
}

interface Properties3 {
  id: Schema;
  firstName: Schema4;
  lastName: Schema4;
  phoneNumber: Schema4;
  email: Schema4;
  address: Schema4;
  city: Schema4;
  state: Schema4;
  zip: Schema4;
}

interface User {
  type: string;
  properties: Properties2;
}

interface Properties2 {
  id: Schema;
  username: Schema4;
  password: Schema4;
  userProfile: Schema2;
  userRoles: Schema5;
}

interface Role {
  type: string;
  properties: Properties;
}

interface Properties {
  id: Schema;
  name: Schema4;
  level: Schema;
}

interface Paths {
  '/users/{id}': Usersid;
  '/routes/{id}': Usersid;
  '/roles/{id}': Usersid;
  '/users': Users;
  '/routes': Routes;
  '/roles': Routes;
  '/auth/login': Authlogin;
  '/auth/any_authority': Authanyauthority;
  '/auth/all_authority': Authanyauthority;
  '/users/match_any': Usersmatchany;
  '/users/match_all': Usersmatchany;
  '/routes/match_any': Usersmatchany;
  '/routes/match_all': Usersmatchany;
  '/roles/match_any': Usersmatchany;
  '/roles/match_all': Usersmatchany;
}

interface Usersmatchany {
  get: Get4;
}

interface Get4 {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter3[];
  responses: Responses4;
}

interface Parameter3 {
  name: string;
  in: string;
  required: boolean;
  schema: Schema2;
}

interface Authanyauthority {
  post: Post3;
}

interface Post3 {
  tags: string[];
  operationId: string;
  parameters: Parameter2[];
  requestBody: RequestBody2;
  responses: Responses6;
}

interface Responses6 {
  '200': _2003;
}

interface _2003 {
  description: string;
  content: Content6;
}

interface Content6 {
  '*/*': _4;
}

interface _4 {
  schema: Schema4;
}

interface RequestBody2 {
  content: Content5;
  required: boolean;
}

interface Content5 {
  'application/json': Applicationjson;
}

interface Applicationjson {
  schema: Schema6;
}

interface Schema6 {
  type: string;
  items: Schema4;
}

interface Authlogin {
  post: Post2;
}

interface Post2 {
  tags: string[];
  operationId: string;
  requestBody: RequestBody;
  responses: Responses5;
}

interface Responses5 {
  '201': _201;
}

interface _201 {
  description: string;
  content: Content2;
}

interface Routes {
  get: Get3;
  post: Post;
}

interface Get3 {
  tags: string[];
  summary: string;
  operationId: string;
  responses: Responses4;
}

interface Responses4 {
  '200': _2002;
}

interface _2002 {
  description: string;
  content: Content4;
}

interface Content4 {
  '*/*': _3;
}

interface _3 {
  schema: Schema5;
}

interface Schema5 {
  type: string;
  items: Schema2;
}

interface Users {
  get: Get2;
  post: Post;
}

interface Post {
  tags: string[];
  summary: string;
  operationId: string;
  requestBody: RequestBody;
  responses: Responses3;
}

interface Responses3 {
  '201': _200;
}

interface Get2 {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter2[];
  responses: Responses;
}

interface Parameter2 {
  name: string;
  in: string;
  required: boolean;
  schema: Schema4;
}

interface Schema4 {
  type: string;
}

interface Usersid {
  get: Get;
  put: Put;
  delete: Delete;
  patch: Put;
}

interface Delete {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter[];
  responses: Responses2;
}

interface Responses2 {
  '204': _204;
}

interface _204 {
  description: string;
  content: Content3;
}

interface Content3 {
  '*/*': _2;
}

interface _2 {
  schema: Schema3;
}

interface Schema3 {
  type: string;
  enum: string[];
}

interface Put {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter[];
  requestBody: RequestBody;
  responses: Responses;
}

interface RequestBody {
  content: Content2;
  required: boolean;
}

interface Content2 {
  'application/json': _;
}

interface Get {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter[];
  responses: Responses;
}

interface Responses {
  '200': _200;
}

interface _200 {
  description: string;
  content: Content;
}

interface Content {
  '*/*': _;
}

interface _ {
  schema: Schema2;
}

interface Schema2 {
  '$ref': string;
}

interface Parameter {
  name: string;
  in: string;
  required: boolean;
  schema: Schema;
}

interface Schema {
  type: string;
  format: string;
}

interface Server {
  url: string;
  description: string;
}

interface Info {
  title: string;
  version: string;
}
