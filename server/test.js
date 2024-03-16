const getUUID = require(`./getUUID`);

async function anjay() {
  const uuid = await getUUID("ZYX24");
  console.log(uuid);
}

anjay()