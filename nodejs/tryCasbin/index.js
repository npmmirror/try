import {
  newEnforcer,
  newModelFromString,
  FileAdapter,
  StringAdapter,
  casbinJsGetPermissionForUser,
} from "casbin";
import fs from "fs";
import ini from "ini";

const modelText = fs.readFileSync("./model.conf", { encoding: "utf-8" });
const policyText = fs.readFileSync("./policy.csv", { encoding: "utf-8" });
console.log({
  modelText,
  policyText,
});
const model = newModelFromString(modelText);

const f = new FileAdapter("./policy.csv");
const f2 = new StringAdapter(policyText);

// f2.addPolicy

const e = await newEnforcer(model, f2);
// const e = await newEnforcer(model, "./policy.csv");

const sub = "alice"; // the user that wants to access a resource.
const obj = "data1"; // the resource that is going to be accessed.
const act = "read"; // the operation that the user performs on the resource.

if ((await e.enforce(sub, obj, act)) === true) {
  // permit alice to read data1
  console.log("ok");
} else {
  // deny the request, show an error
  console.log("fail");
}

// const roles = await e.getRolesForUser("alice");
// console.log(await e.getRolesForUser("group"));
// console.log(await e.getRolesForUser("department"));
// console.log(await e.getRolesForUser("unit"));

console.log(await e.getAllRoles());
console.log(await e.getAllSubjects());

const pms = await casbinJsGetPermissionForUser(e, "alice");
console.log(pms);
