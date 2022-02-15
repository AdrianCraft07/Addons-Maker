require('../library')
function BP() {
  return true
}
function RP(){
  return false
}

BP.Item = (json, { type }) => {
  json.aga = true
  return json
}
function Add(json) {return json.toJson()}
module['exports'] = { BP, RP, Add };