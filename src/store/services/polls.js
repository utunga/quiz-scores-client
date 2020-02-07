import feathersVuex from "feathers-vuex";
import feathersClient from "@/feathers";

const { service } = feathersVuex(feathersClient, { idField: "_id" });
const servicePath = "polls";

const servicePlugin = service(servicePath, {
});

feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

export default servicePlugin;

console.log("polls service loaded");
