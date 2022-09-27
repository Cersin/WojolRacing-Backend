import lodash from "lodash";

const removeFalsyObject = (obj) =>  {
    let newObj = {};
    Object.keys(obj).forEach(prop => {
        if (
            (lodash.isObjectLike(obj[prop]) && !lodash.isEmpty(obj[prop])) ||
            (!lodash.isObjectLike(obj[prop]) && obj[prop])
        ) {
            newObj[prop] = obj[prop];
        }
    });
    return newObj;
};

export default removeFalsyObject;